import { createWire, type Defined, type Wire } from '@forminator/react-wire'
import LocalStorageProvider from '@/providers/LocalStorageProvider'
import type RWPStorageProvider from '@/providers/RWPStorageProvider'
import type { PersistedWire, RWPOptions, WireLikeObject } from '@/types'
import { getHasHydratedStorage, getIsClient, markStorageAsHydrated } from '@/utils'

// Generate unique instance ID
const instanceId = Math.random().toString(36).substring(7)
const rwpLog = (...args: unknown[]) => {
    if (typeof globalThis !== 'undefined' && globalThis.__RWP_LOGGING_ENABLED__ !== false) {
        console.log(...args)
    }
}

export const defaultOptions: RWPOptions = {
    logging: {
        enabled: false,
    },
    storageProvider: LocalStorageProvider,
}

let options: RWPOptions = { ...defaultOptions }
let storage: RWPStorageProvider
const pendingLogs: unknown[][] = []

// Set global logging flag on startup
if (typeof globalThis !== 'undefined' && globalThis.__RWP_LOGGING_ENABLED__ === undefined) {
    globalThis.__RWP_LOGGING_ENABLED__ = defaultOptions.logging.enabled
}

rwpLog('[RWP] Module initialized, instance ID:', instanceId)

// Make storage global so all instances share the same storage after upgrade
rwpLog('[RWP] About to check global storage, instanceId:', instanceId)
try {
    if (!globalThis.__RWP_STORAGE__) {
        rwpLog('[RWP] Creating global storage in instance:', instanceId)
        globalThis.__RWP_STORAGE__ = new LocalStorageProvider('__internal_rwp_storage__')
    } else {
        rwpLog('[RWP] Using existing global storage in instance:', instanceId)
    }
    storage = globalThis.__RWP_STORAGE__
    rwpLog('[RWP] InternalStorage assigned successfully')
} catch (error) {
    if (globalThis.__RWP_LOGGING_ENABLED__) console.error('[RWP] Error setting up global storage:', error)
    storage = new LocalStorageProvider('__internal_rwp_storage__')
}

// Use a global registry to handle multiple module instances
// This ensures all instances share the same wire registry
if (typeof globalThis !== 'undefined') {
    if (!globalThis.__RWP_REGISTERED_WIRES__) {
        rwpLog('[RWP] Creating global registeredWires in instance:', instanceId)
        globalThis.__RWP_REGISTERED_WIRES__ = new Map()
    } else {
        rwpLog('[RWP] Using existing global registeredWires in instance:', instanceId)
    }
}

// Registry to track wire instances for hydration refresh
const registeredWires = globalThis.__RWP_REGISTERED_WIRES__ || new Map<string, WireLikeObject>()
rwpLog('[RWP] registeredWires Map reference in instance:', instanceId, 'size:', registeredWires.size)

export const getNamespace = (): string | null => storage.namespace

export const getStorage = (): RWPStorageProvider => storage

/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export const setNamespace = (namespace: string) => {
    rwpLog('[RWP] setNamespace() called with:', namespace, 'registered wires before:', registeredWires.size)
    const currentNamespace = namespace || getNamespace()

    if (!currentNamespace) throw new Error('react-wire-persisted: Cannot set namespace to null or undefined')

    storage.setNamespace(namespace)
    storage = new LocalStorageProvider(currentNamespace)
    rwpLog(`[RWP] setNamespace() done, registered wires after:`, registeredWires.size)
}

export const getOptions = (): RWPOptions => options

export const setOptions = (value: Partial<RWPOptions>) => {
    options = {
        ...options,
        ...value,
    }
    // Update global logging flag
    if (typeof globalThis !== 'undefined') {
        globalThis.__RWP_LOGGING_ENABLED__ = options.logging.enabled
    }
    /* istanbul ignore next */
    if (options.logging.enabled) {
        console.info('Flushing', pendingLogs.length, 'pending logs')
        while (pendingLogs.length)
            /* istanbul ignore next */
            console.log(...(pendingLogs.shift() || []))
    }
}

/**
 * Refresh all registered wires by reading from storage
 * Called after storage upgrade to sync wires with persisted values
 */
const refreshAllWires = () => {
    rwpLog('[RWP] refreshAllWires() called in instance:', instanceId, 'registered wires:', registeredWires.size)
    log('react-wire-persisted: refreshAllWires() called, registered wires:', registeredWires.size)

    registeredWires.forEach((wire: Wire<unknown> | WireLikeObject, key: string) => {
        const storedValue = storage.getItem(key)
        const currentValue = wire.getValue()

        rwpLog('[RWP] Checking wire', key, {
            storedValue,
            currentValue,
            willUpdate: storedValue !== null && storedValue !== currentValue,
        })

        log('react-wire-persisted: Checking wire', key, {
            storedValue,
            currentValue,
            willUpdate: storedValue !== null && storedValue !== currentValue,
        })

        if (storedValue !== null && storedValue !== currentValue) {
            rwpLog('[RWP] Refreshing wire', key, 'with stored value', storedValue)
            log('react-wire-persisted: Refreshing wire', key, 'with stored value', storedValue)
            wire.setValue(storedValue)
        }
    })
}

/**
 * Attempts to upgrade the storage provider from fake storage to real localStorage
 * This should be called on the client side after hydration
 *
 * @returns true if upgrade was successful
 */
export const upgradeStorage = (): boolean => {
    rwpLog('[RWP] upgradeStorage() called in instance:', instanceId, {
        isClient: getIsClient(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
    })

    log('react-wire-persisted: upgradeStorage() called', {
        isClient: getIsClient(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
    })

    if (!getIsClient()) return false

    const upgraded = storage.upgradeToRealStorage()

    rwpLog('[RWP] upgradeToRealStorage() returned', upgraded)
    log('react-wire-persisted: upgradeToRealStorage() returned', upgraded)

    if (upgraded) {
        markStorageAsHydrated()
        rwpLog('[RWP] Upgraded to real localStorage, calling refreshAllWires()')
        log('react-wire-persisted: Upgraded to real localStorage after hydration')

        // Refresh all wires with stored values
        refreshAllWires()
    }

    return upgraded
}

const log = (...args: unknown[]) => {
    /* istanbul ignore next */
    if (options.logging.enabled)
        /* istanbul ignore next */
        console.log(...args)
    else pendingLogs.push(args)
}

/**
 * Creates a persisted Wire using the `RWPStorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export const createPersistedWire = <T = null>(key: string, value: T = null as T): PersistedWire<T> => {
    rwpLog('[RWP] createPersistedWire() called in instance:', instanceId, 'key:', key, 'value:', value)

    // This check helps ensure no accidental key typos occur
    if (!key) throw new Error(`createPersistedWire: Key cannot be a falsey value (${key}}`)

    // Track this writable entry so we can easily clear all
    storage.register(key, value)

    // The actual Wire backing object
    const wire = createWire<T>(value)

    const getValue = () => wire.getValue()

    const setValue = (newValue: Defined<T>) => {
        rwpLog(
            '[RWP] setValue called in instance:',
            instanceId,
            'key:',
            key,
            'isUsingFakeStorage:',
            storage.isUsingFakeStorage(),
        )
        storage.setItem(key, newValue)
        return wire.setValue(newValue)
    }

    const subscribe = (callback: (value: Defined<T>) => void) => {
        return wire.subscribe(callback)
    }

    // Always start with default value to ensure SSR consistency
    let initialValue: T = value

    // Only read from storage if we've hydrated OR if storage is already using real localStorage
    // (prevents hydration mismatch in SSR, but allows normal behavior in client-only apps)
    const canReadStorage = getHasHydratedStorage() || !storage.isUsingFakeStorage()

    if (canReadStorage && getIsClient()) {
        const storedValue = storage.getItem<T>(key)

        if (storedValue !== null) initialValue = storedValue
    }

    log('react-wire-persisted: create', key, {
        value,
        initialValue,
        hasHydratedStorage: getHasHydratedStorage(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
        canReadStorage,
    })

    if (initialValue !== value && initialValue !== undefined) setValue(initialValue as Defined<T>)

    // Register wire for post-hydration refresh
    registeredWires.set(key, {
        getValue,
        setValue,
        subscribe,
    })

    rwpLog('[RWP] Wire registered, total wires:', registeredWires.size, 'keys:', Array.from(registeredWires.keys()))

    return {
        ...wire,
        getValue,
        setValue,
        subscribe,
    }
}

import { createWire } from '@forminator/react-wire'
import LocalStorageProvider from './providers/LocalStorageProvider.js'
import { getHasHydratedStorage, getIsClient, markStorageAsHydrated } from './utils/index.js'

// Generate unique instance ID
const instanceId = Math.random().toString(36).substring(7)
console.log('[RWP] Module initialized, instance ID:', instanceId)

export const defaultOptions = {
    logging: {
        enabled: false,
    },
}

const Provider = LocalStorageProvider

// Make storage global so all instances share the same storage after upgrade
console.log('[RWP] About to check global storage, instanceId:', instanceId)
let storage
try {
    if (!globalThis.__RWP_STORAGE__) {
        console.log('[RWP] Creating global storage in instance:', instanceId)
        globalThis.__RWP_STORAGE__ = new Provider()
    } else {
        console.log('[RWP] Using existing global storage in instance:', instanceId)
    }
    storage = globalThis.__RWP_STORAGE__
    console.log('[RWP] Storage assigned successfully')
} catch (error) {
    console.error('[RWP] Error setting up global storage:', error)
    storage = new Provider()
}
let options = { ...defaultOptions }
const pendingLogs = []

// Use a global registry to handle multiple module instances
// This ensures all instances share the same wire registry
if (typeof globalThis !== 'undefined') {
    if (!globalThis.__RWP_REGISTERED_WIRES__) {
        console.log('[RWP] Creating global registeredWires in instance:', instanceId)
        globalThis.__RWP_REGISTERED_WIRES__ = new Map()
    } else {
        console.log('[RWP] Using existing global registeredWires in instance:', instanceId)
    }
}

// Registry to track wire instances for hydration refresh
const registeredWires = globalThis.__RWP_REGISTERED_WIRES__ || new Map()
console.log('[RWP] registeredWires Map reference in instance:', instanceId, 'size:', registeredWires.size)

/**
 * Gets the namespace of the storage provider
 *
 * @returns {String}
 */
export const getNamespace = () => storage.namespace

/**
 * Gets the current storage provider class instance
 *
 * @returns {StorageProvider}
 */
export const getStorage = () => storage

export const getOptions = () => options

/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export const setNamespace = (namespace) => {
    console.log('[RWP] setNamespace() called with:', namespace, 'registered wires before:', registeredWires.size)
    storage.setNamespace(namespace)
    storage = new Provider(namespace || getNamespace())
    console.log('[RWP] setNamespace() done, registered wires after:', registeredWires.size)
}

export const setOptions = (value) => {
    options = {
        ...options,
        ...value,
    }
    /* istanbul ignore next */
    if (options.logging.enabled) {
        console.info('Flushing', pendingLogs.length, 'pending logs')
        while (pendingLogs.length)
            /* istanbul ignore next */
            console.log(...pendingLogs.shift())
    }
}

/**
 * Refresh all registered wires by reading from storage
 * Called after storage upgrade to sync wires with persisted values
 */
const refreshAllWires = () => {
    console.log('[RWP] refreshAllWires() called in instance:', instanceId, 'registered wires:', registeredWires.size)
    log('react-wire-persisted: refreshAllWires() called, registered wires:', registeredWires.size)

    registeredWires.forEach((wire, key) => {
        const storedValue = storage.getItem(key)
        const currentValue = wire.getValue()

        console.log('[RWP] Checking wire', key, {
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
            console.log('[RWP] Refreshing wire', key, 'with stored value', storedValue)
            log('react-wire-persisted: Refreshing wire', key, 'with stored value', storedValue)
            wire.setValue(storedValue)
        }
    })
}

/**
 * Attempts to upgrade the storage provider from fake storage to real localStorage
 * This should be called on the client side after hydration
 *
 * @returns {Boolean} True if upgrade was successful
 */
export const upgradeStorage = () => {
    console.log('[RWP] upgradeStorage() called in instance:', instanceId, {
        isClient: getIsClient(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
    })

    log('react-wire-persisted: upgradeStorage() called', {
        isClient: getIsClient(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
    })

    if (!getIsClient()) return false

    const upgraded = storage.upgradeToRealStorage()

    console.log('[RWP] upgradeToRealStorage() returned', upgraded)
    log('react-wire-persisted: upgradeToRealStorage() returned', upgraded)

    if (upgraded) {
        markStorageAsHydrated()
        console.log('[RWP] Upgraded to real localStorage, calling refreshAllWires()')
        log('react-wire-persisted: Upgraded to real localStorage after hydration')

        // Refresh all wires with stored values
        refreshAllWires()
    }

    return upgraded
}

const log = (...args) => {
    /* istanbul ignore next */
    if (options.logging.enabled)
        /* istanbul ignore next */
        console.log(...args)
    else pendingLogs.push(args)
}

/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export const createPersistedWire = (key, value = null) => {
    console.log('[RWP] createPersistedWire() called in instance:', instanceId, 'key:', key, 'value:', value)

    // This check helps ensure no accidental key typos occur
    if (!key && typeof key !== 'number') throw new Error(`createPersistedWire: Key cannot be a falsey value (${key}}`)

    // Track this writable entry so we can easily clear all
    storage.register(key, value)

    // The actual Wire backing object
    const wire = createWire(value)

    const getValue = () => wire.getValue()

    const setValue = (newValue) => {
        console.log(
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

    const subscribe = (fn) => {
        wire.subscribe(fn)
    }

    // Always start with default value to ensure SSR consistency
    let initialValue = value

    // Only read from storage if we've hydrated OR if storage is already using real localStorage
    // (prevents hydration mismatch in SSR, but allows normal behavior in client-only apps)
    const canReadStorage = getHasHydratedStorage() || !storage.isUsingFakeStorage()

    if (canReadStorage && getIsClient()) {
        const storedValue = storage.getItem(key)

        if (storedValue !== null) initialValue = storedValue
    }

    log('react-wire-persisted: create', key, {
        value,
        initialValue,
        hasHydratedStorage: getHasHydratedStorage(),
        isUsingFakeStorage: storage.isUsingFakeStorage(),
        canReadStorage,
    })

    if (initialValue !== value) setValue(initialValue)

    // Register wire for post-hydration refresh
    registeredWires.set(key, {
        getValue,
        setValue,
        subscribe,
    })

    console.log(
        '[RWP] Wire registered, total wires:',
        registeredWires.size,
        'keys:',
        Array.from(registeredWires.keys()),
    )

    return {
        ...wire,
        getValue,
        setValue,
        subscribe,
    }
}

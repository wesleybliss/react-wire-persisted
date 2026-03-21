import StorageProvider from '@/providers/StorageProvider'
import type { AnyStorage } from '@/types'
import { fakeLocalStorage, isLocalStorageAvailable } from '@/utils'

/**
 * A storage provider for `localStorage`
 * @see `StorageProvider.ts` for documentation
 */
class LocalStorageProvider extends StorageProvider {
    public storage: AnyStorage
    private _isUsingFakeStorage: boolean

    constructor(namespace: string, registry: Record<string, unknown> = {}) {
        super(namespace, registry)

        // Always start with fake storage to prevent hydration mismatches
        // Will be upgraded to real storage after hydration via upgradeToRealStorage()
        this.storage = fakeLocalStorage
        this._isUsingFakeStorage = true
    }

    getStorage(): AnyStorage {
        // Use the isomorphic utility to check localStorage availability
        if (isLocalStorageAvailable()) return window.localStorage

        // Fallback to fake localStorage for SSR or when localStorage is disabled
        return fakeLocalStorage
    }

    setNamespace(namespace: string) {
        if (!this.namespace) {
            this.namespace = namespace
            return
        }

        if (this.namespace === namespace) return

        const items = JSON.parse(JSON.stringify(this.getAll()))

        this.removeAll()

        for (const [key, value] of Object.entries(items)) {
            const newKey = key.replace(this.namespace, namespace)
            this.setItem(newKey, value)
        }

        this.namespace = namespace
    }

    getItem(key: string) {
        const val = this.storage.getItem(key)

        if (val === undefined || val === null) return null

        try {
            return JSON.parse(val)
        } catch (_) {
            return val
        }
    }

    setItem(key: string, value: unknown) {
        // Don't allow "null" & similar values to be stringified
        if (value === undefined || value === null) return this.removeItem(key)

        return this.storage.setItem(key, JSON.stringify(value))
    }

    removeItem(key: string, fromRegistry: boolean = false) {
        if (fromRegistry) delete this.registry[key]

        return this.storage.removeItem(key)
    }

    getAll(): Record<string, unknown> {
        const prefixNs = `${this.namespace}.`

        return Object.keys(this.storage).reduce(
            (acc, it) => {
                if (this.namespace ? it.startsWith(prefixNs) : true) acc[it] = this.storage.getItem(it)

                return acc
            },
            {} as Record<string, unknown>,
        )
    }

    _resetAll(useInitialValues: boolean = true, excludedKeys: string[] = [], clearRegistry: boolean = false) {
        const prefixNs = `${this.namespace}.`

        Object.keys(this.storage).forEach((it) => {
            const isAppKey = this.namespace ? it.startsWith(prefixNs) : true
            const isExcluded = excludedKeys?.includes(it) || false

            if (!isAppKey || isExcluded) return

            if (useInitialValues) {
                const isRegistered = Object.hasOwn(this.registry, it)

                if (isRegistered)
                    if (this.registry[it] === undefined || this.registry[it] === null) this.storage.removeItem(it)
                    else this.storage.setItem(it, JSON.stringify(this.registry[it]))
                else this.storage.removeItem(it)
            } else {
                this.storage.removeItem(it)

                if (clearRegistry) delete this.registry[it]
            }
        })
    }

    resetAll(excludedKeys: string[] = [], clearRegistry: boolean = false) {
        this._resetAll(true, excludedKeys || [], clearRegistry)
    }

    removeAll(excludedKeys: string[] = [], clearRegistry: boolean = false) {
        this._resetAll(false, excludedKeys || [], clearRegistry)
    }

    /**
     * Attempt to upgrade from fake storage to real localStorage
     * This is useful for hydration scenarios
     */
    upgradeToRealStorage(): boolean {
        if (!this._isUsingFakeStorage) return false // Already using real storage

        if (!isLocalStorageAvailable()) return false // Real storage still not available

        // Simply switch to real storage - don't migrate fake data
        // The existing persisted data in localStorage should be preserved
        this.storage = window.localStorage
        this._isUsingFakeStorage = false

        return true
    }

    /**
     * Check if currently using fake storage
     */
    isUsingFakeStorage(): boolean {
        return this._isUsingFakeStorage
    }
}

export default LocalStorageProvider

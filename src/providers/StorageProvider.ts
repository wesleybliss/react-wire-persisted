/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.ts` for an example implementation
 */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: WIP next PR will switch to TypeScript */
abstract class StorageProvider {
    namespace: string | null
    registry: Record<string, unknown>

    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
     * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
     */
    constructor(namespace: string, registry: Record<string, unknown>) {
        // Simulate being an abstract class
        if (new.target === StorageProvider)
            throw TypeError(`StorageProvider is abstract. Extend this class to implement it`)

        this.namespace = namespace || null
        this.registry = registry || /* istanbul ignore next */ {}
    }

    /**
     * Sets the namespace for this storage provider, and migrates
     * all stored values to the new namespace
     * @param {String} namespace New namespace for this storage provider
     */
    /* istanbul ignore next */
    abstract setNamespace(namespace: string | null): void

    /**
     * Registers an item with it's initial value. This is used for logging, resetting, etc.
     * @param {String} key InternalStorage item's key
     * @param {*} initialValue InternalStorage item's initial value
     */
    register<T>(key: string, initialValue: T | null) {
        this.registry[key] = initialValue
    }

    /**
     * Reads an item from storage
     * @param {String} key Key for the item to retrieve
     */
    /* istanbul ignore next */
    abstract getItem<T>(key: string): T | null

    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    /* istanbul ignore next */
    abstract setItem<T>(key: string, value: T | null): void

    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
     */
    /* istanbul ignore next */
    abstract removeItem(key: string, fromRegistry: boolean): void

    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    /* istanbul ignore next */
    abstract getAll(): Record<string, unknown>

    /**
     *
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
     */
    /* istanbul ignore next */
    abstract _resetAll(useInitialValues: boolean, excludedKeys: string[], clearRegistry: boolean): void

    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    abstract resetAll(excludedKeys: string[]): void

    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    abstract removeAll(excludedKeys: string[]): void

    upgradeToRealStorage(): boolean {
        return false
    }

    isUsingFakeStorage(): boolean {
        return false
    }
}

export default StorageProvider

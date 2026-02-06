/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.js` for an example implementation
 */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: WIP next PR will switch to TypeScript */
class StorageProvider {
    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
     * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
     */
    constructor(namespace, registry) {
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
    setNamespace(namespace) {}

    /**
     * Registers an item with it's initial value. This is used for logging, resetting, etc.
     * @param {String} key Storage item's key
     * @param {*} initialValue Storage item's initial value
     */
    register(key, initialValue) {
        this.registry[key] = initialValue
    }

    /**
     * Reads an item from storage
     * @param {String} key Key for the item to retrieve
     */
    /* istanbul ignore next */
    getItem(key) {}

    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    /* istanbul ignore next */
    setItem(key, value) {}

    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
     */
    /* istanbul ignore next */
    removeItem(key, fromRegistry = false) {}

    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    /* istanbul ignore next */
    getAll() {}

    /**
     *
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
     */
    /* istanbul ignore next */
    _resetAll(useInitialValues = true, excludedKeys = [], clearRegistry = false) {}

    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    resetAll(excludedKeys = []) {}

    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    /* istanbul ignore next */
    removeAll(excludedKeys = []) {}
}

export default StorageProvider

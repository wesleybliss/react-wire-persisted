
/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.js` for an example implementation
 */
class StorageProvider {
    
    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
     */
    constructor(namespace = null, registry = {}) {
        
        // Simulate being an abstract class
        if (new.target === StorageProvider)
            throw TypeError(`StorageProvider is abstract. Extend this class to implement it`)
        
        this.namespace = namespace
        this.registry = registry
        
    }
    
    /**
     * Sets the namespace for this storage provider, and migrates
     * all stored values to the new namespace
     * @param {String} namespace New namespace for this storage provider
     */
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
    getItem(key) {}
    
    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    setItem(key, value) {}
    
    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     */
    removeItem(key) {}
    
    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    getAll() {}
    
    /**
     * Logs all stored keys & values to console
     * If a `namespace` was set, only keys prefixed with the namespace will be logged
     */
    logAll() {}
    
    /**
     * 
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    _resetAll(useInitialValues = true, excludedKeys = []) {}
    
    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    resetAll(excludedKeys = []) {}
    
    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    removeAll(excludedKeys = []) {}
    
}

export default StorageProvider

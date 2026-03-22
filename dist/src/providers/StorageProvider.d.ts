/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.ts` for an example implementation
 */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: WIP next PR will switch to TypeScript */
declare abstract class StorageProvider {
    namespace: string | null;
    registry: Record<string, unknown>;
    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging & reset functions
     * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
     */
    constructor(namespace: string, registry: Record<string, unknown>);
    /**
     * Sets the namespace for this storage provider, and migrates
     * all stored values to the new namespace
     * @param {String} namespace New namespace for this storage provider
     */
    abstract setNamespace(namespace: string | null): void;
    /**
     * Registers an item with it's initial value. This is used for logging, resetting, etc.
     * @param {String} key InternalStorage item's key
     * @param {*} initialValue InternalStorage item's initial value
     */
    register<T>(key: string, initialValue: T | null): void;
    /**
     * Reads an item from storage
     * @param {String} key Key for the item to retrieve
     */
    abstract getItem<T>(key: string): T | null;
    /**
     * Stores a value
     * @param {String} key Item's storage key
     * @param {String} value Item's value to store
     */
    abstract setItem<T>(key: string, value: T | null): void;
    /**
     * Removes an item from storage
     * @param {String} key Item's storage key
     * @param {Boolean} fromRegistry (Optional) If the item should also be removed from the registry
     */
    abstract removeItem(key: string, fromRegistry: boolean): void;
    /**
     * Gets all stored keys & values
     * If a `namespace` was set, only keys prefixed with the namespace will be returned
     */
    abstract getAll(): Record<string, unknown>;
    /**
     *
     * @param {Boolean} useInitialValues If values should be replaced with their initial values. If false, keys are removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     * @param {Boolean} clearRegistry (Optional) If the registry should also be cleared
     */
    abstract _resetAll(useInitialValues: boolean, excludedKeys: string[], clearRegistry: boolean): void;
    /**
     * Resets all values to their initial values
     * If a `namespace` is set, only keys prefixed with the namespace will be reset
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    abstract resetAll(excludedKeys: string[]): void;
    /**
     * Removes all items from local storage.
     * If a `namespace` is set, only keys prefixed with the namespace will be removed
     * @param {String[]} excludedKeys (Optional) List of keys to exclude
     */
    abstract removeAll(excludedKeys: string[]): void;
    upgradeToRealStorage(): boolean;
    isUsingFakeStorage(): boolean;
}
export default StorageProvider;

import { ReactNode } from 'react';
import { Wire } from '@forminator/react-wire';

/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
declare const addKey = (value: string): void => {
    storageKeys[value] = value
};

/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export declare const createPersistedWire: <T>(key: string, value?: T | null) => PersistedWire<T>;

export declare const defaultOptions: RWPOptions;

declare const fakeLocalStorage: InternalStorage = {
    getItem: (key: string): string | null => storage[key],
    setItem: (key: string, value: string): void => {
        storage[key] = value
    },
    removeItem: (key: string): void => {
        delete storage[key]
    },
    // Make Object.keys() work properly for _resetAll method
    ...storage,
};

/**
 * Check if the client has finished hydrating
 */
declare const getHasHydrated = (): boolean => hasHydrated;

/**
 * Check if storage has been hydrated (safe to read from real localStorage)
 */
declare const getHasHydratedStorage = (): boolean => hasHydratedStorage;

/**
 * Check if we're running in a browser environment
 */
declare const getIsClient = (): boolean => isClient;

/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} InternalStorage keys map
 */
declare const getKeys = (): Record<string, string> => storageKeys;

/**
 * Gets the namespace of the storage provider
 */
export declare const getNamespace: () => string | null;

export declare const getOptions: () => RWPOptions;

/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace InternalStorage namespace prefix
 * @param {Object} keys (Optional) InternalStorage key/values. Defaults to the internally managed keys map
 */
declare const getPrefixedKeys = (namespace: string, keys: Record<string, string> | null = null) => {
    const items = keys || storageKeys

    if (!namespace) return items

    return Object.keys(items).reduce(
    (acc, it) => {
        acc[it] = `${namespace}.${items[it]}`

        return acc
    },
        {} as Record<string, string>,
    )
};

/**
 * Gets the current storage provider class instance
 */
export declare const getStorage: () => StorageProvider;

export declare const HydrationProvider: ({ children, onUpgrade, autoUpgrade }: HydrationProviderProps) => ReactNode;

/**
 * A Next.js App Router compatible component that handles automatic storage upgrade
 * after hydration. Use this in your root layout.
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {Function} props.onUpgrade Callback called when storage is upgraded
 * @param {Boolean} props.autoUpgrade Whether to automatically upgrade storage (default: true)
 */
declare type HydrationProviderProps = {
    children: ReactNode;
    onUpgrade?: () => void;
    autoUpgrade?: boolean;
};

declare interface InternalStorage {
    getItem: (key: string) => string | null
    setItem: (key: string, value: string) => void
    removeItem: (key: string) => void
}

/**
 * Check if localStorage is available and safe to use
 */
declare const isLocalStorageAvailable = (): boolean => {
    if (!isClient) return false

    try {
        const testKey = '__rwp_test__'

        window.localStorage.setItem(testKey, 'test')
        window.localStorage.removeItem(testKey)

        return true
    } catch (_) {
        return false
    }
};

/**
 * Checks if a value is a primitive type
 *
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
declare const isPrimitive = (val: unknown): boolean => {
    const type = typeof val

    if (val === null) return true
    if (Array.isArray(val)) return false
    if (type === 'object') return false

    return type !== 'function'
};

/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
declare const key = (value: string) => addKey(value);

/**
 * Mark storage as hydrated (called after upgradeStorage)
 */
declare const markStorageAsHydrated = (): void => {
    hasHydratedStorage = true
};

declare type PersistedWire<T> = Wire<T | null>;

declare type RWPOptions = {
    logging: {
        enabled: boolean;
    };
};

/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export declare const setNamespace: (namespace: string) => void;

export declare const setOptions: (value: RWPOptions) => void;

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

/**
 * Attempts to upgrade the storage provider from fake storage to real localStorage
 * This should be called on the client side after hydration
 *
 * @returns true if upgrade was successful
 */
export declare const upgradeStorage: () => boolean;

/**
 * React hook that handles automatic storage upgrade after hydration
 * This should be used in the root component of your application
 *
 * @param {Object} options Configuration options
 * @param {Boolean} options.autoUpgrade Whether to automatically upgrade storage (default: true)
 * @param {Function} options.onUpgrade Callback called when storage is upgraded
 */
export declare const useHydration: (options?: UseHydrationOptions) => {
    hasUpgraded: boolean;
};

export declare type UseHydrationOptions = {
    autoUpgrade?: boolean;
    onUpgrade?: () => void;
};

declare namespace utils {
    export {
        isPrimitive,
        fakeLocalStorage,
        getIsClient,
        getHasHydrated,
        getHasHydratedStorage,
        markStorageAsHydrated,
        isLocalStorageAvailable,
        addKey,
        key,
        getKeys,
        getPrefixedKeys
    }
}
export { utils }

export { }

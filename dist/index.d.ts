import { ReactNode } from 'react';
import * as utils from '@/utils';
import { Wire } from '@forminator/react-wire';

declare type AnyStorage = InternalStorage | Storage;

/**
 * Creates a persisted Wire using the `RWPStorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export declare const createPersistedWire: <T>(key: string, value?: T | null) => PersistedWire<T>;

export declare const defaultOptions: RWPOptions;

export declare const getNamespace: () => string | null;

export declare const getOptions: () => RWPOptions;

export declare const getStorage: () => RWPStorageProvider;

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
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}

/**
 * A storage provider for `localStorage`
 * @see `RWPStorageProvider.ts` for documentation
 */
export declare class LocalStorageProvider extends RWPStorageProvider {
    storage: AnyStorage;
    private _isUsingFakeStorage;
    constructor(namespace: string, registry?: Record<string, unknown>);
    getStorage(): AnyStorage;
    setNamespace(namespace: string): void;
    getItem(key: string): any;
    setItem(key: string, value: unknown): void;
    removeItem(key: string, fromRegistry?: boolean): void;
    getAll(): Record<string, unknown>;
    _resetAll(useInitialValues?: boolean, excludedKeys?: string[], clearRegistry?: boolean): void;
    resetAll(excludedKeys?: string[], clearRegistry?: boolean): void;
    removeAll(excludedKeys?: string[], clearRegistry?: boolean): void;
    /**
     * Attempt to upgrade from fake storage to real localStorage
     * This is useful for hydration scenarios
     */
    upgradeToRealStorage(): boolean;
    /**
     * Check if currently using fake storage
     */
    isUsingFakeStorage(): boolean;
}

export declare class MemoryStorageProvider extends LocalStorageProvider {
    constructor(namespace: string, registry?: Record<string, unknown>);
    getStorage(): InternalStorage;
}

declare type PersistedWire<T> = Wire<T | null>;

declare type RWPOptions = {
    logging: {
        enabled: boolean;
    };
    storageProvider?: typeof RWPStorageProvider;
};

/**
 * Base class to allow storage access
 * @see `LocalStorageProvider.ts` for an example implementation
 */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: WIP next PR will switch to TypeScript */
export declare abstract class RWPStorageProvider {
    namespace: string | null;
    registry: Record<string, unknown>;
    /**
     * Initializes the class
     * @param {String} namespace Namespace to prefix all keys with. Mostly used for the logging and reset functions
     * @param {Object} registry (Optional) Initialize the storage provider with an existing registry
     */
    protected constructor(namespace: string, registry: Record<string, unknown>);
    /**
     * Sets the namespace for this storage provider, and migrates
     * all stored values to the new namespace
     * @param {String} namespace New namespace for this storage provider
     */
    abstract setNamespace(namespace: string | null): void;
    /**
     * Registers an item with its initial value. This is used for logging, resetting, etc.
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
     * Gets all stored keys and values
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
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export declare const setNamespace: (namespace: string) => void;

export declare const setOptions: (value: Partial<RWPOptions>) => void;

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

export { utils }

export { }

import type StorageProvider from '@/providers/StorageProvider';
import type { PersistedWire, RWPOptions } from '@/types';
export declare const defaultOptions: RWPOptions;
/**
 * Gets the namespace of the storage provider
 */
export declare const getNamespace: () => string | null;
/**
 * Gets the current storage provider class instance
 */
export declare const getStorage: () => StorageProvider;
export declare const getOptions: () => RWPOptions;
/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export declare const setNamespace: (namespace: string) => void;
export declare const setOptions: (value: RWPOptions) => void;
/**
 * Attempts to upgrade the storage provider from fake storage to real localStorage
 * This should be called on the client side after hydration
 *
 * @returns true if upgrade was successful
 */
export declare const upgradeStorage: () => boolean;
/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export declare const createPersistedWire: <T>(key: string, value?: T | null) => PersistedWire<T>;

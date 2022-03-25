import { LinkIds } from "@forminator/react-wire";

/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
declare const addKey: (value: any) => void;

/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 *
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export declare const createPersistedWire: (
  key: any,
  value?: any
) => {
  getValue: () => any;
  setValue: (newValue: any) => void;
  subscribe: (fn: any) => void;
  " state-wire": [any, (t: any) => void];
  _getId(): string;
  _getLinkIds(): LinkIds;
  fn: <K extends any>(name: K, value: {}[K]) => () => void;
  fns: {};
  " fns-wire": {};
};

export declare const defaultOptions: {
  logging: {
    enabled: boolean;
  };
};

declare const fakeLocalStorage: {
  getItem: (key: any) => any;
  setItem: (key: any, value: any) => void;
  removeItem: (key: any) => void;
};

/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} Storage keys map
 */
declare const getKeys: () => {};

/**
 * Gets the namespace of the storage provider
 *
 * @returns {String}
 */
export declare const getNamespace: () => any;

export declare const getOptions: () => {
  logging: {
    enabled: boolean;
  };
};

/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace Storage namespace prefix
 * @param {Object} keys (Optional) Storage key/values. Defaults to the internally managed keys map
 */
declare const getPrefixedKeys: (namespace: any, keys?: any) => any;

/**
 * Gets the current storage provider class instance
 *
 * @returns {StorageProvider}
 */
export declare const getStorage: () => any;

/**
 * Checks if a value is a primitive type
 *
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
declare const isPrimitive: (val: any) => boolean;

/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
declare const key: (value: any) => void;

/**
 * Sets the namespace for the storage provider
 *
 * @param {String} namespace The namespace for the storage provider
 */
export declare const setNamespace: (namespace: any) => void;

export declare const setOptions: (value: any) => void;

declare namespace utils {
  export {
    isPrimitive,
    addKey,
    key,
    getKeys,
    getPrefixedKeys,
    fakeLocalStorage,
  };
}
export { utils };

export {};

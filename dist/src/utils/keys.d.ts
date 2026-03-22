/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
export declare const addKey: (value: string) => void;
/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
export declare const key: (value: string) => void;
/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} InternalStorage keys map
 */
export declare const getKeys: () => Record<string, string>;
/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace InternalStorage namespace prefix
 * @param {Object} keys (Optional) InternalStorage key/values. Defaults to the internally managed keys map
 */
export declare const getPrefixedKeys: (namespace: string, keys?: Record<string, string> | null) => Record<string, string>;

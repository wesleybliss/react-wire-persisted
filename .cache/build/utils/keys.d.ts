/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
export declare const addKey: (value: any) => void;
/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
export declare const key: (value: any) => void;
/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} Storage keys map
 */
export declare const getKeys: () => {};
/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace Storage namespace prefix
 * @param {Object} keys (Optional) Storage key/values. Defaults to the internally managed keys map
 */
export declare const getPrefixedKeys: (namespace: any, keys?: any) => any;
//# sourceMappingURL=keys.d.ts.map
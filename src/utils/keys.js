/**
 * Convenience map of keys
 */
const storageKeys = {}

/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
export const addKey = (value) => {
    storageKeys[value] = value
}

/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
export const key = (value) => addKey(value)

/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} Storage keys map
 */
export const getKeys = () => storageKeys

/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace Storage namespace prefix
 * @param {Object} keys (Optional) Storage key/values. Defaults to the internally managed keys map
 */
export const getPrefixedKeys = (namespace, keys = null) => {
    const items = keys || storageKeys

    if (!namespace) return items

    return Object.keys(items).reduce((acc, it) => {
        acc[it] = `${namespace}.${items[it]}`

        return acc
    }, {})
}

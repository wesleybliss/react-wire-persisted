/**
 * Convenience map of keys
 */
const storageKeys: Record<string, string> = {}

/**
 * Adds a key to the keys map
 *
 * @param {String} value Key name
 */
export const addKey = (value: string): void => {
    storageKeys[value] = value
}

/**
 * Adds a key to the keys map
 * (Alias for `addKey`)
 *
 * @param {String} value Key name
 */
export const key = (value: string) => addKey(value)

/**
 * Convenience method to get internally managed storage keys
 *
 * @returns {Object} InternalStorage keys map
 */
export const getKeys = (): Record<string, string> => storageKeys

/**
 * Helper utility to prefix all keys in a map to use a namespace
 *
 * @param {String} namespace InternalStorage namespace prefix
 * @param {Object} keys (Optional) InternalStorage key/values. Defaults to the internally managed keys map
 */
export const getPrefixedKeys = (namespace: string, keys: Record<string, string> | null = null) => {
    const items = keys || storageKeys

    if (!namespace) return items

    return Object.keys(items).reduce((acc, it) => {
        acc[it] = `${namespace}.${items[it]}`

        return acc
    }, {} as Record<string, string>)
}

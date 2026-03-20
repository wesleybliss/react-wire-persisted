export * from './fakeLocalStorage'
export * from './isomorphic'
export * from './keys'

/**
 * Checks if a value is a primitive type
 *
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
export const isPrimitive = (val: unknown): boolean => {
    const type = typeof val

    if (val === null) return true
    if (Array.isArray(val)) return false
    if (type === 'object') return false

    return type !== 'function'
}

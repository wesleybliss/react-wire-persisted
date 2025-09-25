export * from './keys'
export * from './fakeLocalStorage'
export * from './isomorphic'

/**
 * Checks if a value is a primitive type
 * 
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
export const isPrimitive = val => {
    
    const type = typeof val
    
    if (val === null) return true
    if (Array.isArray(val)) return false
    if (type === 'object') return false
    
    return type !== 'function'
    
}

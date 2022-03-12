export * from './keys'
export * from './fakeLocalStorage'

/**
 * Checks if a value is a primitive type
 * 
 * @param {*} val Value to check
 * @returns {Boolean} True if value is a primitive type
 */
export const isPrimitive = val => {
    
    const type = typeof val
    
    if (Array.isArray(val)) return false
    if (type === 'object') return val === null
    
    return type !== 'function'
    
}

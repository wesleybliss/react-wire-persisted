
export const isPrimitive = val => {
    
    const type = typeof val
    
    if (Array.isArray(val)) return false
    if (type === 'object') return val === null
    
    return type !== 'function'
    
}

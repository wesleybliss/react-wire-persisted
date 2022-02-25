import StorageProvider from './StorageProvider'
import { isPrimitive } from './utils'

class LocalStorageProvider extends StorageProvider {
    
    constructor(namespace = null) {
        
        super(namespace)
        
        if (typeof Storage === 'undefined')
            throw new Error('LocalStorageProvider: localStorage not supported')
        
    }
    
    getItem(key) {
        
        const val = localStorage.getItem(key)
        
        if (val === undefined || val === null)
            return null
        
        try {
            return JSON.parse(val)
        } catch (e) {
            return val
        }
        
    }
    
    setItem(key, value) {
        
        let val = value
        
        // Don't allow "null" & similar values to be stringified
        if (val !== undefined && val !== null)
            val = isPrimitive(value) ? value : JSON.stringify(value)
        
        return localStorage.setItem(key, val)
        
    }
    
    removeItem(key) {
        
        return localStorage.removeItem(key)
        
    }
    
    getAll(namespace = null) {
        
        return Object.keys(localStorage).reduce((acc, it) => {
            if (namespace ? it.startsWith(`${this.namespace}.`) : true)
                acc[it] = localStorage.getItem(it)
            return acc
        }, {})
        
    }
    
    logAll() {
        
        console.log(this.getAll(this.namespace))
        
    }
    
    _resetAll(withDefaults = true, excludeKeys = []) {
        
        Object.keys(localStorage).forEach(it => {
            
            const isAppKey = this.namespace ? it.startsWith(`${this.namespace}.`) : true
            const isExcluded = excludeKeys.includes(it)
            
            if (isAppKey && !isExcluded) {
                if (withDefaults)
                    if (Object.prototype.hasOwnProperty.call(registry, it))
                        localStorage.setItem(it, registry[it])
                    else
                        localStorage.removeItem(it)
                else
                    localStorage.removeItem(it)
            }
            
        })
        
    }
    
    resetAll(excludeKeys = []) {
        this._resetAll(this.namespace, true, excludeKeys)
    }
    
    removeAll(excludeKeys = []) {
        this._resetAll(this.namespace, false, excludeKeys)
    }
    
}

export default LocalStorageProvider

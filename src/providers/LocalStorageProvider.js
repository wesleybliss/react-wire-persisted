import StorageProvider from './StorageProvider'
import { isPrimitive } from '../utils'

/**
 * A storage provider for `localStorage`
 * @see `StorageProvider.js` for documentation
 */
class LocalStorageProvider extends StorageProvider {
    
    constructor(namespace = null, registry = {}) {
        
        super(namespace, registry)
        
        /* istanbul ignore next */
        if (typeof localStorage === 'undefined')
            console.warn('LocalStorageProvider: localStorage not supported')
        
    }
    
    setNamespace(namespace) {
        
        if (!this.namespace) {
            this.namespace = namespace
            return
        }
        
        if (this.namespace === namespace)
            return
        
        const items = JSON.parse(JSON.stringify(this.getAll()))
        
        this.removeAll()
        
        for (const [key, value] of Object.entries(items)) {
            const newKey = key.replace(this.namespace, namespace)
            this.setItem(newKey, value)
        }
        
        this.namespace = namespace
        
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
    
    removeItem(key, fromRegistry = false) {
        
        if (fromRegistry)
            delete this.registry[key]
        
        return localStorage.removeItem(key)
        
    }
    
    getAll() {
        
        const prefixNs = `${this.namespace}.`
        
        return Object.keys(localStorage).reduce((acc, it) => {
            
            if (this.namespace ? it.startsWith(prefixNs) : true)
                acc[it] = localStorage.getItem(it)
            
            return acc
            
        }, {})
        
    }
    
    _resetAll(
        useInitialValues = true,
        excludedKeys = [],
        clearRegistry = false
    ) {
        
        const prefixNs = `${this.namespace}.`
        
        Object.keys(localStorage).forEach(it => {
            
            const isAppKey = this.namespace ? it.startsWith(prefixNs) : true
            const isExcluded = excludedKeys?.includes(it) || false
            
            if (!isAppKey || isExcluded) return
            
            if (useInitialValues) {
                
                const isRegistered = Object.prototype.hasOwnProperty.call(this.registry, it)
                
                if (isRegistered)
                    localStorage.setItem(it, this.registry[it])
                else
                    localStorage.removeItem(it)
                
            } else {
                
                localStorage.removeItem(it)
                
                if (clearRegistry)
                    delete this.registry[it]
                
            }
            
        })
        
    }
    
    resetAll(excludedKeys = [], clearRegistry = false) {
        this._resetAll(true, excludedKeys || [], clearRegistry)
    }
    
    removeAll(excludedKeys = [], clearRegistry = false) {
        this._resetAll(false, excludedKeys || [], clearRegistry)
    }
    
}

export default LocalStorageProvider

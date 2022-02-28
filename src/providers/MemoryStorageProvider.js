import StorageProvider from './StorageProvider'
import { isPrimitive } from '../utils'

class MemoryStorage {
    
    constructor() {
        this.data = {}
    }
    
    getItem(key) {
        return this.data[key]
    }
    
    setItem(key, value) {
        this.data[key] = value
    }
    
    removeItem(key) {
        delete this.data[key]
    }
    
}

const memoryStorage = new MemoryStorage()

/**
 * A storage provider for ephemeral memory
 * This should not be used in production
 * @see `StorageProvider.js` for documentation
 */
class MemoryStorageProvider extends StorageProvider {
    
    constructor(namespace = null, registry = {}) {
        
        super(namespace, registry)
        
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
        
        const val = memoryStorage.getItem(key)
        
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
        
        return memoryStorage.setItem(key, val)
        
    }
    
    removeItem(key, fromRegistry = false) {
        
        if (fromRegistry)
            delete this.registry[key]
        
        return memoryStorage.removeItem(key)
        
    }
    
    getAll() {
        
        const prefixNs = `${this.namespace}.`
        
        return Object.keys(memoryStorage.data).reduce((acc, it) => {
            
            if (this.namespace ? it.startsWith(prefixNs) : true)
                acc[it] = memoryStorage.getItem(it)
            
            return acc
            
        }, {})
        
    }
    
    _resetAll(
        useInitialValues = true,
        excludedKeys = [],
        clearRegistry = false
    ) {
        
        const prefixNs = `${this.namespace}.`
        
        Object.keys(memoryStorage.data).forEach(it => {
            
            const isAppKey = this.namespace ? it.startsWith(prefixNs) : true
            const isExcluded = excludedKeys?.includes(it) || false
            
            if (!isAppKey || isExcluded) return
            
            if (useInitialValues) {
                
                const isRegistered = Object.prototype.hasOwnProperty.call(this.registry, it)
                
                if (isRegistered)
                    memoryStorage.setItem(it, this.registry[it])
                else
                    memoryStorage.removeItem(it)
                
            } else {
                
                memoryStorage.removeItem(it)
                
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

export default MemoryStorageProvider

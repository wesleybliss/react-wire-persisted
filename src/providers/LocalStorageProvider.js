import StorageProvider from './StorageProvider'
import { fakeLocalStorage, isPrimitive, isLocalStorageAvailable } from '../utils'

/**
 * A storage provider for `localStorage`
 * @see `StorageProvider.js` for documentation
 */
class LocalStorageProvider extends StorageProvider {
    
    constructor(namespace = null, registry = {}) {

        super(namespace, registry)

        this.storage = this.getStorage()
        this._isUsingFakeStorage = !isLocalStorageAvailable()

    }
    
    getStorage() {

        // Use the isomorphic utility to check localStorage availability
        if (isLocalStorageAvailable()) {
            return window.localStorage
        }

        // Fallback to fake localStorage for SSR or when localStorage is disabled
        return fakeLocalStorage

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
        
        const val = this.storage.getItem(key)
        
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
        
        return this.storage.setItem(key, val)
        
    }
    
    removeItem(key, fromRegistry = false) {
        
        if (fromRegistry)
            delete this.registry[key]
        
        return this.storage.removeItem(key)
        
    }
    
    getAll() {
        
        const prefixNs = `${this.namespace}.`
        
        return Object.keys(this.storage).reduce((acc, it) => {
            
            if (this.namespace ? it.startsWith(prefixNs) : true)
                acc[it] = this.storage.getItem(it)
            
            return acc
            
        }, {})
        
    }
    
    _resetAll(
        useInitialValues = true,
        excludedKeys = [],
        clearRegistry = false
    ) {

        const prefixNs = `${this.namespace}.`

        Object.keys(this.storage).forEach(it => {

            const isAppKey = this.namespace ? it.startsWith(prefixNs) : true
            const isExcluded = excludedKeys?.includes(it) || false

            if (!isAppKey || isExcluded) return

            if (useInitialValues) {

                const isRegistered = Object.prototype.hasOwnProperty.call(this.registry, it)

                if (isRegistered)
                    this.storage.setItem(it, this.registry[it])
                else
                    this.storage.removeItem(it)

            } else {

                this.storage.removeItem(it)

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

    /**
     * Attempt to upgrade from fake storage to real localStorage
     * This is useful for hydration scenarios
     */
    upgradeToRealStorage() {

        if (!this._isUsingFakeStorage) {
            return false // Already using real storage
        }

        if (!isLocalStorageAvailable()) {
            return false // Real storage still not available
        }

        const fakeData = { ...this.storage }
        this.storage = window.localStorage
        this._isUsingFakeStorage = false

        // Migrate data from fake storage to real storage
        Object.keys(fakeData).forEach(key => {
            if (key !== '__IS_FAKE_LOCAL_STORAGE__' && fakeData[key] != null) {
                try {
                    this.storage.setItem(key, fakeData[key])
                } catch (e) {
                    // If we can't write to localStorage, revert to fake storage
                    this.storage = fakeLocalStorage
                    this._isUsingFakeStorage = true
                    return false
                }
            }
        })

        return true
    }

    /**
     * Check if currently using fake storage
     */
    isUsingFakeStorage() {
        return this._isUsingFakeStorage
    }

}

export default LocalStorageProvider

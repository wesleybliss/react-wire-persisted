import { createWire } from '@forminator/react-wire'
import MemoryStorageProvider from './providers/MemoryStorageProvider'

let Provider = MemoryStorageProvider
let storage = new Provider()

/**
 * Gets the namespace of the storage provider
 * @returns {String}
 */
export const getNamespace = () => storage?.namespace || null

/**
 * Gets the current storage provider class
 * @returns {StorageProvider}
 */
export const getProvider = () => Provider

/**
 * Gets the current storage provider class instance
 * @returns {StorageProvider}
 */
export const getStorage = () => storage

/**
 * Sets the storage provider class & instance
 * @param {StorageProvider} StorageProviderImpl Any implementation of `StorageProvider`
 */
export const setProvider = (StorageProviderImpl, namespace = null) => {
    Provider = StorageProviderImpl
    storage = new Provider(namespace || getNamespace())
}

/**
 * Sets the namespace for the storage provider
 * @param {String} namespace The namespace for the storage provider
 */
export const setNamespace = namespace => {
    storage.setNamespace(namespace)
}

/**
 * Creates a persisted Wire using the `StorageProvider` that is currently set
 * Defaults to `localStorage` via `LocalStorageProvider`
 * 
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export const createPersistedWire = (key, value = null) => {
    
    if (!Provider) throw new Error(
        `A provider must be set before using this library`
    )
    
    // This check helps ensure no accidental key typos occur
    if (!key && (typeof key) !== 'number') throw new Error(
        `createPersistedWire: Key cannot be a falsey value (${key}}`
    )
    
    // Track this writable entry so we can easily clear all
    storage.register(key, value)
    
    // The actual Wire backing object
    const wire = createWire(value)
    
    const getValue = () => wire.getValue()
    
    const setValue = newValue => {
        storage.setItem(key, newValue)
        return wire.setValue(newValue)
    }
    
    const subscribe = fn => {
        wire.subscribe(fn)
    }
    
    const storedValue = storage.getItem(key)
    const initialValue = storedValue === false ? false : (storedValue || value)
    
    if (initialValue !== value)
        setValue(initialValue)
    
    return {
        ...wire,
        getValue,
        setValue,
        subscribe,
    }
    
}

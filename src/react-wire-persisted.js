import { createWire } from '@forminator/react-wire'
import LocalStorageProvider from './LocalStorageProvider'

let NS = 'app'
let Provider = LocalStorageProvider
let storage = new Provider()

// Track all storage keys so we can log, reset, etc.
const registry = {}

export const getNamespace = () => NS
export const getProvider = () => Provider
export const getStorage = () => storage

export const setProvider = StorageProviderImpl => {
    Provider = StorageProviderImpl
    storage = new Provider(NS)
}

export const setNamespace = newNS => {
    NS = newNS
    setProvider(Provider)
}

/**
 * Creates a localStorage persistent Wire object
 * 
 * @param {String} key Unique key for storing this value
 * @param {*} value Initial value of this Wire
 * @returns A new Wire decorated with localStorage functionality
 */
export const createPersistedWire = (key, value = null) => {
    
    // This check helps ensure no accidental key typos occur
    if (!key) throw new Error(
        `createPersistedWire: Key cannot be a falsey value (${key}}`
    )
    
    // Track this writable entry so we can easily clear all
    registry[key] = value
    
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

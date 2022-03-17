import { createWire } from '@forminator/react-wire'
import LocalStorageProvider from './providers/LocalStorageProvider'

export const defaultOptions = {
    logging: false,
}

let Provider = LocalStorageProvider
let storage = new Provider()
let options = { ...defaultOptions }
let pendingLogs = []

/**
 * Gets the namespace of the storage provider
 * 
 * @returns {String}
 */
export const getNamespace = () => storage.namespace

/**
 * Gets the current storage provider class instance
 * 
 * @returns {StorageProvider}
 */
export const getStorage = () => storage

export const getOptions = () => options

/**
 * Sets the namespace for the storage provider
 * 
 * @param {String} namespace The namespace for the storage provider
 */
export const setNamespace = namespace => {
    storage.setNamespace(namespace)
    storage = new Provider(namespace || getNamespace())
}

export const setOptions = value => {
    options = {
        ...options,
        ...value,
    }
    /* istanbul ignore next */
    if (options.logging) {
        console.info('Flushing', pendingLogs.length, 'pending logs')
        while (pendingLogs.length)
            /* istanbul ignore next */
            console.log(...pendingLogs.shift())
    }
}

const log = (...args) => {
    /* istanbul ignore next */
    if (options.logging.enabled)
        /* istanbul ignore next */
        console.log(...args)
    else
        pendingLogs.push(args)
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
    const initialValue = storedValue === null ? value : storedValue
    
    log('react-wire-persisted: create', key, {
        value,
        storedValue,
        initialValue,
    })
    
    if (initialValue !== value)
        setValue(initialValue)
    
    return {
        ...wire,
        getValue,
        setValue,
        subscribe,
    }
    
}

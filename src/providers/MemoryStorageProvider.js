import { fakeLocalStorage } from '../utils/index.js'
import LocalStorageProvider from './LocalStorageProvider.js'

class MemoryStorageProvider extends LocalStorageProvider {
    constructor(namespace = null, registry = {}) {
        super(namespace, registry)
    }

    getStorage() {
        return fakeLocalStorage
    }
}

export default MemoryStorageProvider

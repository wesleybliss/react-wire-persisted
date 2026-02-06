import LocalStorageProvider from './LocalStorageProvider.js'
import { fakeLocalStorage } from '../utils/index.js'

class MemoryStorageProvider extends LocalStorageProvider {
    
    constructor(namespace = null, registry = {}) {
        
        super(namespace, registry)
        
    }
    
    getStorage() {
        
        return fakeLocalStorage
        
    }
    
}

export default MemoryStorageProvider

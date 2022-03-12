import LocalStorageProvider from './LocalStorageProvider'
import { fakeLocalStorage } from '../utils'

class MemoryStorageProvider extends LocalStorageProvider {
    
    constructor(namespace = null, registry = {}) {
        
        super(namespace, registry)
        
    }
    
    getStorage() {
        
        return fakeLocalStorage
        
    }
    
}

export default MemoryStorageProvider


class StorageProvider {
    
    constructor(namespace = null) {
        
        this.namespace = namespace
        
    }
    
    getItem(key) {}
    
    setItem(key) {}
    
    removeItem(key) {}
    
    getAll(namespace = null) {}
    
    logAll(namespace = null) {}
    
    _resetAll(
        namespace = null,
        withDefaults = true,
        excludeKeys = []
    ) {}
    
    resetAll(namespace = null, excludeKeys = []) {}
    
    removeAll(namespace = null, excludeKeys = []) {}
    
}

export default StorageProvider

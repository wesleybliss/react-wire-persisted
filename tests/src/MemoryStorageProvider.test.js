import MemoryStorageProvider from '../../src/providers/MemoryStorageProvider'

const namespace = 'fakeNamespace'

describe('MemoryStorageProvider', () => {
    
    let storage = null
    
    beforeEach(() => {
        
        storage?.removeAll(null, true)
        storage = new MemoryStorageProvider()
        
    })
    
    test('Proves it is using memory storage', () => {
        
        const key = '__IS_FAKE_LOCAL_STORAGE__'
        storage.setItem(key, true)
        const value = storage.getItem(key)
        
        // console.log('ALL ITEMS', storage.getStorage())
        
        expect(value).toStrictEqual(true)
        
    })
    
    test('Instantiates with a null namespace', () => {
        
        const storageWithNs = new MemoryStorageProvider(namespace)
        
        expect(storageWithNs.namespace).toStrictEqual(namespace)
        
    })
    
})

import StorageProvider from '../../src/providers/StorageProvider'

test('Abstract class StorageProvider can\'t be instantiated', async () => {
    
    const fn = () => {
        const namespace = 'fakeNamespace'
        return new StorageProvider(namespace)
    }
    
    expect(fn).toThrow(Error)
    
})

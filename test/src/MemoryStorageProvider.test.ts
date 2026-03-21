import MemoryStorageProvider from 'src/providers/MemoryStorageProvider'

const namespace = 'fakeNamespace'

describe('MemoryStorageProvider', () => {
    let storage: MemoryStorageProvider = new MemoryStorageProvider(undefined as unknown as string)
    const noKeys = null as unknown as string[]

    beforeEach(() => {
        storage?.removeAll(noKeys, true)
        storage = new MemoryStorageProvider(undefined as unknown as string)
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

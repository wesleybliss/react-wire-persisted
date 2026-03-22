import StorageProvider from '@/providers/StorageProvider'

test("Abstract class StorageProvider can't be instantiated", () => {
    const fn = () => {
        const namespace = 'fakeNamespace'
        return new (StorageProvider as unknown as new (ns: string) => StorageProvider)(namespace)
    }

    expect(fn).toThrow(Error)
})

import RWPStorageProvider from '@/providers/RWPStorageProvider'

test("Abstract class RWPStorageProvider can't be instantiated", () => {
    const fn = () => {
        const namespace = 'fakeNamespace'
        return new (RWPStorageProvider as unknown as new (ns: string) => RWPStorageProvider)(namespace)
    }

    expect(fn).toThrow(Error)
})

import LocalStorageProvider from '@/providers/LocalStorageProvider'
import StorageProvider from '@/providers/StorageProvider'

const namespace = 'fakeNamespace'
const keyFor = (key: string) => `${namespace}.${key}`

describe('LocalStorageProvider', () => {
    let storage: LocalStorageProvider = new LocalStorageProvider(namespace)
    const noKeys = null as unknown as string[]

    beforeEach(() => {
        storage?.removeAll(noKeys, true)
        storage = new LocalStorageProvider(namespace)
        storage.upgradeToRealStorage()
    })

    test('Instantiates with a null namespace', () => {
        const storageWithoutNs = new LocalStorageProvider(undefined as unknown as string)

        expect(storageWithoutNs.namespace).toStrictEqual(null)
    })

    test('Instantiates with an existing registry', () => {
        const fakeRegistry = { foo: 'bar' }
        const storageWithRegistry = new LocalStorageProvider('testing', fakeRegistry)

        expect(storageWithRegistry.namespace).toStrictEqual('testing')
        expect(storageWithRegistry.registry).toMatchObject(fakeRegistry)
    })

    test('Instantiates with correct namespace', () => {
        expect(storage.namespace).toBe(namespace)
    })

    test('Has expected methods', () => {
        const baseMethods = Object.getOwnPropertyNames(StorageProvider.prototype)

        const methods = [
            'setNamespace',
            'getItem',
            'setItem',
            'removeItem',
            'getAll',
            '_resetAll',
            'resetAll',
            'removeAll',
        ]

        // Should implement all parent methods
        baseMethods.forEach((it) => {
            expect(typeof (storage as unknown as Record<string, unknown>)[it]).toBe('function')
        })

        methods.forEach((it) => {
            expect(typeof (storage as unknown as Record<string, unknown>)[it]).toBe('function')
        })
    })

    test("Sets it's namespace correctly", () => {
        const fakeNamespace = 'foo'

        storage.setNamespace(fakeNamespace)

        expect(storage.namespace).toBe(fakeNamespace)
    })

    test("Changes it's namespace & updates items", () => {
        const changedNamespace = `${namespace}-CHANGED`
        const fooKey = keyFor('foo')
        const barKey = keyFor('bar')

        expect(storage.namespace).toBe(namespace)

        storage.setItem(fooKey, 'bar')
        storage.setItem(barKey, 'biz')
        expect(Object.keys(storage.getAll()).length).toBe(2)

        storage.setNamespace(changedNamespace)
        expect(storage.namespace).toBe(changedNamespace)

        Object.keys(storage.getAll()).forEach((it) => {
            expect(it.startsWith(changedNamespace)).toBe(true)
        })
    })

    test('Writes and reads items successfully', () => {
        const key = keyFor('foo')
        const value = 'bar'

        storage.setItem(key, value)

        expect(storage.getItem(key)).toBe(value)
    })

    test('Writes non-primitives to JSON correctly', () => {
        const key = keyFor('foo')
        const value = { foo: 'bar' }

        storage.setItem(key, value)
        storage.setItem('testing', undefined)

        expect(storage.getItem(key)).toMatchObject(value)
    })

    test('Writes numbers to JSON correctly', () => {
        const key = keyFor('foo')
        const values = [0, 1, 2.3, 45.6789]

        values.forEach((value) => {
            storage.setItem(key, value)
            const storedValue = storage.getItem(key)
            expect(storedValue).toStrictEqual(value)
            expect(typeof storedValue).toStrictEqual(typeof value)
        })
    })

    test('Removes items successfully, but keeps registry', () => {
        const key = keyFor('foo')
        const value = 'bar'

        storage.setItem(key, value)

        expect(storage.getItem(key)).toBe(value)

        storage.removeItem(key)

        expect(storage.getItem(key)).toBe(null)
    })

    test('Removes items successfully, and clears registry', () => {
        const key = keyFor('foo')
        const value = 'bar'

        storage.setItem(key, value)

        expect(storage.getItem(key)).toBe(value)

        storage.removeItem(key, true)

        expect(storage.getItem(key)).toBe(null)
    })

    test('Gets all stored values', () => {
        const items = [
            [keyFor('foo'), 'bar'],
            [keyFor('biz'), 'bat'],
            [keyFor('hello'), 'world'],
        ]

        items.forEach(([k, v]) => {
            storage.setItem(k, v)
        })

        const stored = storage.getAll()

        expect(typeof stored).toBe('object')
        expect(Object.keys(stored).length).toBe(items.length)

        storage.setNamespace(null as unknown as string)
        const storedChanged = storage.getAll()

        expect(typeof storedChanged).toBe('object')
        expect(Object.keys(storedChanged).length).toBe(items.length)
    })

    test('Resets all items', () => {
        const changedKey = keyFor('biz')
        const initialValue = 'bat'
        const changedValue = 'bat--CHANGED'

        const items = [
            [keyFor('foo'), 'bar'],
            [changedKey, initialValue],
            [keyFor('hello'), 'world'],
        ]

        items.forEach(([k, v]) => {
            storage.register(k, v)
            storage.setItem(k, v)
        })

        // Change an item
        storage.setItem(changedKey, changedValue)

        expect(storage.getItem(changedKey)).toBe(changedValue)

        // Now reset back to the initial values
        storage.resetAll()

        expect(storage.getItem(changedKey)).toBe(initialValue)
    })

    test('Removes all items, but keeps registry', () => {
        const items = [
            [keyFor('foo'), 'bar'],
            [keyFor('biz'), 'bat'],
            [keyFor('hello'), 'world'],
        ]

        items.forEach(([k, v]) => {
            storage.register(k, v)
            storage.setItem(k, v)
        })

        storage.removeAll()

        expect(storage.getAll()).toStrictEqual({})
        expect(Object.keys(storage.registry).length).toBe(3)
    })

    test('Resets all items, excluding some', () => {
        const targetKey = keyFor('biz')
        const targetValue = 'bat'

        const items = [
            [keyFor('foo'), 'bar'],
            [targetKey, targetValue],
            [keyFor('hello'), 'world'],
        ]

        items.forEach(([k, v]) => {
            storage.register(k, v)
            storage.setItem(k, v)
        })

        storage.resetAll([targetKey], true)

        expect(Object.keys(storage.getAll()).length).toStrictEqual(3)
        expect(storage.getAll()[targetKey]).toStrictEqual(JSON.stringify(targetValue))

        storage.resetAll(noKeys, true)

        expect(Object.keys(storage.getAll()).length).toStrictEqual(3)
        expect(Object.keys(storage.registry).length).toStrictEqual(3)
    })

    test('Removes all items and clears registry', () => {
        const targetKey = keyFor('foo')
        const targetValue = 'bar'

        const items = [
            [targetKey, targetValue],
            [keyFor('biz'), 'bat'],
            [keyFor('hello'), 'world'],
        ]

        items.forEach(([k, v]) => {
            storage.register(k, v)
            storage.setItem(k, v)
        })

        storage.removeAll(
            noKeys, // excludeKeys
            false, // clearRegistry
        )

        expect(storage.getAll()).toStrictEqual({})
        expect(Object.keys(storage.registry).length).toBe(3)

        storage.removeAll(
            noKeys, // excludeKeys
            true, // clearRegistry
        )

        expect(storage.getAll()).toStrictEqual({})
        expect(Object.keys(storage.registry).length).toBe(3)

        delete storage.registry[targetKey]
        storage.resetAll(
            noKeys, // excludeKeys
            true, // clearRegistry
        )

        expect(storage.getAll()).toStrictEqual({})
        expect(Object.keys(storage.registry).length).toBe(2)
    })

    test('Removes unregistered items during a reset', () => {
        const key = keyFor('foo')
        const value = 'bar'

        storage.setItem(key, value)

        delete storage.registry[key]
        storage.resetAll()

        expect(localStorage.getItem('bad')).toBe(null)
    })

    test('_resetAll() internal test', () => {
        // This is mostly for coverage, since this method is tested through other methods
        const key = keyFor('foo')
        const value = 'bar'

        const ops = [
            () => storage.getAll(),
            () => storage._resetAll(),
            () => storage._resetAll(true, [], true),
            () => storage._resetAll(false, noKeys, true),
            () => storage._resetAll(true, ['ignore'], true),
            () => storage._resetAll(false, ['ignore'], true),
            () => storage._resetAll(true, ['ignore'], false),
        ]

        ops.forEach((fn) => {
            storage.setItem(key, value)
            storage.setItem('badkey', value)
            fn()
        })

        const storageWithoutNs = new LocalStorageProvider(undefined as unknown as string)
        storageWithoutNs.setItem('badkey', value)
        storageWithoutNs.getAll()
        storageWithoutNs._resetAll()
    })
})

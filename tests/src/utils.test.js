import * as utils from '../../src/utils'

test('Utils', () => {
    
    test('isPrimitive', () => {
        
        const primitives = [null, 1, true, 'hello']
        const unprimitives = [{}, new Error('test')]
        
        expect(utils.isPrimitive([])).toBe(false)
        
        primitives.forEach(it => {
            expect(utils.isPrimitive(it)).toBe(true)
        })
        
        unprimitives.forEach(it => {
            expect(utils.isPrimitive(it)).toBe(false)
        })
        
    })
    
})

test('Utils/Keys', () => {
    
    test('key(), addKey(), getKeys()', () => {
        
        utils.key('foo')
        utils.addKey('bar')
        
        const keys = utils.getKeys()
        
        expect(keys).toStrictEqual({
            foo: 'foo',
            bar: 'bar',
        })
        
    })
    
    test('getPrefixedKeys()', () => {
        
        const ns = 'fakeNamespace'
        
        const src = {
            foo: 'foo',
            bar: 'bar',
        }
        
        const expectedWithNamespace = {
            foo: `${ns}.foo`,
            bar: `${ns}.bar`,
        }
        
        Object.keys(src).forEach(utils.addKey)
        
        const plain = utils.getKeys()
        const prefixed = utils.getPrefixedKeys()
        const prefixedWithNamespace = utils.getPrefixedKeys(ns)
        
        expect(plain).toStrictEqual(src)
        expect(prefixed).toStrictEqual(src)
        expect(prefixedWithNamespace).toStrictEqual(expectedWithNamespace)
        
    })
    
})

test('Fake localStorage', () => {
    
    test('It has fake key', () => {
        
        const key = '__IS_FAKE_LOCAL_STORAGE__'
        const value = utils.fakeLocalStorage[key]
        
        expect(value).toStrictEqual(true)
        
    })
    
    test('It can read, write, and remove', () => {
        
        const key = 'testKey'
        const expected = 'testValue'
        
        utils.fakeLocalStorage.setItem(key, expected)
        
        let value = utils.fakeLocalStorage.getItem(key)
        expect(value).toStrictEqual(expected)
        
        utils.fakeLocalStorage.removeItem(key)
        
        value = utils.fakeLocalStorage.getItem(key)
        expect(value).toBe(undefined)
        
    })
    
})

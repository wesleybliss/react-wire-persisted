import * as rwp from '../src/react-wire-persisted'

const namespace = 'fakeNamespace'

describe('react-wire-persisted', () => {
    
    beforeEach(() => {
        
        rwp.setNamespace(namespace)
        rwp.getStorage().removeAll(null, true)
        rwp.getStorage().registry = {}
        localStorage.clear()
        
        expect(Object.keys(rwp.getStorage().getAll()).length).toBe(0)
        expect(Object.keys(rwp.getStorage().registry).length).toBe(0)
        expect(Object.keys(localStorage).length).toBe(0)
        
    })
    
    test('setOptions', () => {
        
        const expected = { logging: true }
        
        expect(rwp.getOptions()).toStrictEqual(rwp.defaultOptions)
        
        rwp.setOptions(expected)
        
        expect(rwp.getOptions()).toStrictEqual(expected)
        
    })
    
    test('getNamespace()', () => {
        
        expect(rwp.getNamespace()).toBe(namespace)
        
    })
    
    test('Empty namespace', () => {
        
        rwp.setNamespace(null)
        
        expect(rwp.getNamespace()).toBe(null)
        
    })
    
    test('createPersistedWire()', () => {
        
        const key = 'foo.bar'
        const value1 = 'biz'
        const value2 = 'biz--CHANGED'
        const wire = rwp.createPersistedWire(key, value1)
        
        expect(wire.getValue()).toBe(value1)
        
        wire.setValue(value2)
        
        expect(wire.getValue()).toBe(value2)
        
        // Should not allow falsey keys
        const fnBadKey = () => rwp.createPersistedWire(false, 'testing')
        
        expect(fnBadKey).toThrow(Error)
        
    })
    
    test('createPersistedWire() with empty value', () => {
        
        const key = 'foo.bar'
        const emptyWire = rwp.createPersistedWire(key)
        
        expect(emptyWire.getValue()).toStrictEqual(null)
        
    })
    
    test('createPersistedWire() with false value', () => {
        
        const key = 'foo.bar'
        const emptyWire1 = rwp.createPersistedWire(key, true)
        
        expect(emptyWire1.getValue()).toStrictEqual(true)
        
        localStorage.setItem(key, false)
        
        const emptyWire2 = rwp.createPersistedWire(key, false)
        expect(emptyWire2.getValue()).toStrictEqual(false)
        
    })
    
    test('createPeristedWire() with existing stored value', () => {
        
        const key = 'foo.bar'
        const value = 'testing'
        const changedValue = 'changed'
        
        expect(localStorage.getItem(key)).toBe(null)
        expect(rwp.getStorage().getItem(key)).toBe(null)
        
        const wire = rwp.createPersistedWire(key, value)
        wire.setValue(value)
        
        expect(wire.getValue()).toBe(value)
        expect(localStorage.getItem(key)).toBe(value)
        expect(rwp.getStorage().getItem(key)).toStrictEqual(value)
        
        // rwp.getStorage().setItem(key, value)
        const otherWire = rwp.createPersistedWire(key, changedValue)
        
        expect(wire.getValue()).toBe(value)
        expect(otherWire.getValue()).toBe(value)
        
        // Since we didn't call setValue, the Wire value is changed, but not the persisted value
        expect(localStorage.getItem(key)).toBe(value)
        
    })
    
    test('createPeristedWire() with existing stored numbers', () => {
        
        const fn = value => {
            
            const key = 'foo.bar'
            const changedValue = -1
            
            expect(localStorage.getItem(key)).toBe(null)
            expect(rwp.getStorage().getItem(key)).toBe(null)
            
            const wire = rwp.createPersistedWire(key, value)
            wire.setValue(value)
            
            // Note: localStorage compares to the stringified value, since that's how it stores data
            expect(wire.getValue()).toStrictEqual(value)
            expect(localStorage.getItem(key)).toStrictEqual(value.toString())
            expect(rwp.getStorage().getItem(key)).toStrictEqual(value)
            
            // rwp.getStorage().setItem(key, value)
            const otherWire = rwp.createPersistedWire(key, changedValue, true)
            
            // Note: localStorage compares to the stringified value, since that's how it stores data
            expect(wire.getValue()).toStrictEqual(value)
            expect(otherWire.getValue()).toStrictEqual(value)
            
            // Since we didn't call setValue, the Wire value is changed, but not the persisted value
            expect(localStorage.getItem(key)).toStrictEqual(value.toString())
            
            localStorage.clear()
            
        }
        
        const values = [0, 1, 2.3, 45.6789]
        
        values.forEach(fn)
        
    })
    
})

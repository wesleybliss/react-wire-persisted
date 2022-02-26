import * as utils from '../src/utils'

describe('Utils', () => {
    
    test('isPrimitive', () => {
        
        const primitives = [1, true, 'hello']
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

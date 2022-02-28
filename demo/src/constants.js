import { key, getPrefixedKeys } from '../../src/utils'

export const NS = 'react-persisted-wire-demo'

key('demoText')

key('selectedCategoryId')
key('selectedPersonName')

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }

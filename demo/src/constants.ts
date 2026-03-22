import { getPrefixedKeys, key } from '@/utils'

export const NS = 'react-persisted-wire-demo'

key('demoText')
key('demoNumber')

key('selectedCategoryId')
key('selectedPersonName')

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }

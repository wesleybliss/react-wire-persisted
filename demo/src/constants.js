
export const NS = 'react-persisted-wire-demo'

const keys = {}

keys.selectedCategoryId = 'selectedCategoryId'
keys.selectedPersonName = 'selectedPersonName'

const prefixedKeys = Object.keys(keys).reduce((acc, it) => ({
    ...acc,
    [it]: `${NS}.${keys[it]}`,
}), {})

export { prefixedKeys as keys }

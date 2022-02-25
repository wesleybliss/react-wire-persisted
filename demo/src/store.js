import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from '../../src/react-wire-persisted'
import { keys } from './constants'

export const categories = createWire(null)
export const selectedCategoryId = createPersistedWire(keys.selectedCategoryId, null)

export const hasCategories = createSelector({
    get: ({ get }) => get(categories)?.length > 0
})

export const selectedCategory = createSelector({
    get: ({ get }) => {
        if (!get(hasCategories)) return null
        return get(categories).find(it => it.id === get(selectedCategoryId))
    }
})

export const people = createWire(null)
export const selectedPersonName = createPersistedWire(keys.selectedPersonName, null)

export const hasPeople = createSelector({
    get: ({ get }) => get(people)?.length > 0
})

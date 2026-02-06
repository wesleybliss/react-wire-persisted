import fakeData from './data.json'
import * as store from './store'

// Don't hold up tests unnecessarily
/* istanbul ignore next */
const simulatedTimeout = process.env.NODE_ENV === 'test' ? 0 : 2000

// Simulate network delay
/* istanbul ignore next */
const sleep = (delayMs = 1000) => new Promise((resolve) => setTimeout(resolve, delayMs))

// Simulate fetching categories from an API server
export const fetchCategories = async () => {
    await sleep(simulatedTimeout)
    store.categories.setValue(fakeData.categories)
}

// Simulate fetching people for a given category ID from an API server
export const fetchPeople = async (categoryId) => {
    await sleep(simulatedTimeout)
    const people = fakeData.people.filter((it) => it.categoryId === categoryId)
    store.people.setValue(people)
}

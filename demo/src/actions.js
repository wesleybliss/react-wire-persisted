import * as store from './store'
import fakeData from './data.json'

// Simulate network delay
const sleep = (delayMs = 1000) =>
    new Promise(resolve => setTimeout(resolve, delayMs))

// Simulate fetching categories from an API server
export const fetchCategories = async () => {
    await sleep(2000)
    store.categories.setValue(fakeData.categories)
}

// Simulate fetching people for a given category ID from an API server
export const fetchPeople = async (categoryId) => {
    await sleep(2000)
    const people = fakeData.people.filter(it => it.categoryId === categoryId)
    store.people.setValue(people)
}


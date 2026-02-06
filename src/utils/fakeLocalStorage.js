const storage = {
    __IS_FAKE_LOCAL_STORAGE__: true,
}

export const fakeLocalStorage = {
    getItem: (key) => storage[key],
    setItem: (key, value) => {
        storage[key] = value
    },
    removeItem: (key) => {
        delete storage[key]
    },
    // Make Object.keys() work properly for _resetAll method
    ...storage,
}

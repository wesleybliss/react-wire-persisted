
const storage = {
    __IS_FAKE_LOCAL_STORAGE__: true,
}

export const fakeLocalStorage = {
    getItem: key => fakeLocalStorage[key],
    setItem: (key, value) => {
        fakeLocalStorage[key] = value
    },
    removeItem: key => {
        delete fakeLocalStorage[key]
    }
}

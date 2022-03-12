
export const fakeLocalStorage = {
    __IS_FAKE_LOCAL_STORAGE__: true,
}

fakeLocalStorage.getItem = key => fakeLocalStorage[key]

fakeLocalStorage.setItem = (key, value) => {
    fakeLocalStorage[key] = value
}

fakeLocalStorage.removeItem = key => {
    delete fakeLocalStorage[key]
}

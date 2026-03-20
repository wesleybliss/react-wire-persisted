import type { InternalStorage } from '@/types'

const storage: Record<string, string> = {
    __IS_FAKE_LOCAL_STORAGE__: 'true',
}

export const fakeLocalStorage: InternalStorage = {
    getItem: (key: string): string | null => storage[key],
    setItem: (key: string, value: string): void => {
        storage[key] = value
    },
    removeItem: (key: string): void => {
        delete storage[key]
    },
    // Make Object.keys() work properly for _resetAll method
    ...storage,
}

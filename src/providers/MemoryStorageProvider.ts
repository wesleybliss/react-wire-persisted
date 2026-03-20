import { fakeLocalStorage } from 'src/utils'
import LocalStorageProvider from './LocalStorageProvider'

class MemoryStorageProvider extends LocalStorageProvider {
    constructor(namespace: string, registry: Record<string, unknown> = {}) {
        super(namespace, registry)
    }

    getStorage() {
        return fakeLocalStorage
    }
}

export default MemoryStorageProvider

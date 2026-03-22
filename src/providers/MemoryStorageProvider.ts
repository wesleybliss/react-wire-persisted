import { fakeLocalStorage } from '@/utils'
import LocalStorageProvider from './LocalStorageProvider'

export class MemoryStorageProvider extends LocalStorageProvider {
    constructor(namespace: string, registry: Record<string, unknown> = {}) {
        super(namespace, registry)
    }

    getStorage() {
        return fakeLocalStorage
    }
}

export default MemoryStorageProvider

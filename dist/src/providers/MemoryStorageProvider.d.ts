import LocalStorageProvider from './LocalStorageProvider';
declare class MemoryStorageProvider extends LocalStorageProvider {
    constructor(namespace: string, registry?: Record<string, unknown>);
    getStorage(): import("../types").InternalStorage;
}
export default MemoryStorageProvider;

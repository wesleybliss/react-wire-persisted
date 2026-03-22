import StorageProvider from '@/providers/StorageProvider';
import type { AnyStorage } from '@/types';
/**
 * A storage provider for `localStorage`
 * @see `StorageProvider.ts` for documentation
 */
declare class LocalStorageProvider extends StorageProvider {
    storage: AnyStorage;
    private _isUsingFakeStorage;
    constructor(namespace: string, registry?: Record<string, unknown>);
    getStorage(): AnyStorage;
    setNamespace(namespace: string): void;
    getItem(key: string): any;
    setItem(key: string, value: unknown): void;
    removeItem(key: string, fromRegistry?: boolean): void;
    getAll(): Record<string, unknown>;
    _resetAll(useInitialValues?: boolean, excludedKeys?: string[], clearRegistry?: boolean): void;
    resetAll(excludedKeys?: string[], clearRegistry?: boolean): void;
    removeAll(excludedKeys?: string[], clearRegistry?: boolean): void;
    /**
     * Attempt to upgrade from fake storage to real localStorage
     * This is useful for hydration scenarios
     */
    upgradeToRealStorage(): boolean;
    /**
     * Check if currently using fake storage
     */
    isUsingFakeStorage(): boolean;
}
export default LocalStorageProvider;

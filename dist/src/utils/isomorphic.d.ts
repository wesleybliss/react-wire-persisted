/**
 * Utilities for handling server-side rendering and client-side hydration
 */
/**
 * Check if we're running in a browser environment
 */
export declare const getIsClient: () => boolean;
/**
 * Check if the client has finished hydrating
 */
export declare const getHasHydrated: () => boolean;
/**
 * Check if storage has been hydrated (safe to read from real localStorage)
 */
export declare const getHasHydratedStorage: () => boolean;
/**
 * Mark storage as hydrated (called after upgradeStorage)
 */
export declare const markStorageAsHydrated: () => void;
/**
 * Check if localStorage is available and safe to use
 */
export declare const isLocalStorageAvailable: () => boolean;

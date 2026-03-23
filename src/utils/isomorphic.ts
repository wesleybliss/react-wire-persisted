/**
 * Utilities for handling server-side rendering and client-side hydration
 */

let isClient: boolean = false
let hasHydrated: boolean = false
let hasHydratedStorage: boolean = false

// Detect if we're running in a browser environment
if (typeof window !== 'undefined') {
    isClient = true

    // Mark as hydrated when the DOM is ready
    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', () => {
            hasHydrated = true
        })
    else hasHydrated = true
}

/**
 * Check if we're running in a browser environment
 */
export const getIsClient = (): boolean => isClient

/**
 * Check if the client has finished hydrating
 */
export const getHasHydrated = (): boolean => hasHydrated

/**
 * Check if storage has been hydrated (safe to read from real localStorage)
 */
export const getHasHydratedStorage = (): boolean => hasHydratedStorage

/**
 * Mark storage as hydrated (called after upgradeStorage)
 */
export const markStorageAsHydrated = (): void => {
    hasHydratedStorage = true
}

/**
 * Check if localStorage is available and safe to use
 */
export const isLocalStorageAvailable = (): boolean => {
    if (!isClient) return false

    try {
        const testKey = '__rwp_test__'

        window.localStorage.setItem(testKey, 'test')
        window.localStorage.removeItem(testKey)

        return true
    } catch (_) {
        return false
    }
}

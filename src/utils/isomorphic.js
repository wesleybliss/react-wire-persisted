/**
 * Utilities for handling server-side rendering and client-side hydration
 */

let isClient = false
let hasHydrated = false

// Detect if we're running in a browser environment
if (typeof window !== 'undefined') {
    isClient = true

    // Mark as hydrated when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            hasHydrated = true
        })
    } else {
        hasHydrated = true
    }
}

/**
 * Check if we're running in a browser environment
 */
export const getIsClient = () => isClient

/**
 * Check if the client has finished hydrating
 */
export const getHasHydrated = () => hasHydrated

/**
 * Check if localStorage is available and safe to use
 */
export const isLocalStorageAvailable = () => {
    if (!isClient) return false

    try {
        const testKey = '__rwp_test__'
        window.localStorage.setItem(testKey, 'test')
        window.localStorage.removeItem(testKey)
        return true
    } catch (e) {
        return false
    }
}
'use client'

// This file is specifically for Next.js App Router client components
// Import this directly: import { HydrationProvider } from 'react-wire-persisted/client.mjs'

import { useEffect, useRef } from 'react'

// Inline all the necessary utilities to avoid any import issues
const isClient = typeof window !== 'undefined'

const isLocalStorageAvailable = () => {
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

// Simple fake storage for SSR
const fakeStorage = {
    data: {},
    getItem: (key) => fakeStorage.data[key] || null,
    setItem: (key, value) => {
        fakeStorage.data[key] = value
    },
    removeItem: (key) => {
        delete fakeStorage.data[key]
    }
}

// Get current storage (real or fake)
const getCurrentStorage = () => {
    return isLocalStorageAvailable() ? window.localStorage : fakeStorage
}

// Simple storage upgrade function
const upgradeStorageToReal = () => {
    if (!isClient || !isLocalStorageAvailable()) {
        return false
    }

    // If we're already using real localStorage, nothing to do
    if (fakeStorage.data && Object.keys(fakeStorage.data).length === 0) {
        return false
    }

    try {
        // Move data from fake to real storage
        const fakeData = { ...fakeStorage.data }
        Object.keys(fakeData).forEach(key => {
            if (fakeData[key] != null) {
                window.localStorage.setItem(key, fakeData[key])
            }
        })

        // Clear fake storage
        fakeStorage.data = {}
        return true
    } catch (e) {
        return false
    }
}

/**
 * A Next.js App Router compatible client component that handles automatic storage upgrade
 * after hydration. Import this from 'react-wire-persisted/client.mjs' to ensure proper client-side operation.
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {Function} props.onUpgrade Callback called when storage is upgraded
 * @param {Boolean} props.autoUpgrade Whether to automatically upgrade storage (default: true)
 */
export function HydrationProvider({ children, onUpgrade, autoUpgrade = true }) {
    const hasUpgraded = useRef(false)

    useEffect(() => {
        if (!autoUpgrade || hasUpgraded.current || !isClient) {
            return
        }

        const attemptUpgrade = () => {
            // Wait for DOM to be ready
            if (document.readyState !== 'loading' && !hasUpgraded.current) {
                const upgraded = upgradeStorageToReal()

                if (upgraded) {
                    hasUpgraded.current = true
                    onUpgrade?.()
                }
            }
        }

        // Try to upgrade immediately if DOM is already ready
        attemptUpgrade()

        // Also try after a short delay to ensure everything is ready
        const timeoutId = setTimeout(attemptUpgrade, 100)

        return () => clearTimeout(timeoutId)
    }, [autoUpgrade, onUpgrade])

    return children
}
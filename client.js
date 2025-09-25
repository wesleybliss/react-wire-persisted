'use client'

// This file is specifically for Next.js App Router client components
// Import this directly: import { HydrationProvider } from 'react-wire-persisted/client'

import { useEffect, useRef } from 'react'
import { upgradeStorage } from './dist/react-wire-persisted.js'

// Inline the hydration detection logic to avoid import issues
const getIsClient = () => typeof window !== 'undefined'

const getHasHydrated = () => {
    if (!getIsClient()) return false
    return document.readyState !== 'loading'
}

/**
 * A Next.js App Router compatible client component that handles automatic storage upgrade
 * after hydration. Import this from 'react-wire-persisted/client' to ensure proper client-side operation.
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {Function} props.onUpgrade Callback called when storage is upgraded
 * @param {Boolean} props.autoUpgrade Whether to automatically upgrade storage (default: true)
 */
export function HydrationProvider({ children, onUpgrade, autoUpgrade = true }) {
    const hasUpgraded = useRef(false)

    useEffect(() => {
        if (!autoUpgrade || hasUpgraded.current || !getIsClient()) {
            return
        }

        const attemptUpgrade = () => {
            if (getHasHydrated() && !hasUpgraded.current) {
                const upgraded = upgradeStorage()

                if (upgraded) {
                    hasUpgraded.current = true
                    onUpgrade?.()
                }
            }
        }

        // Try to upgrade immediately if already hydrated
        attemptUpgrade()

        // Also try after a short delay to ensure DOM is ready
        const timeoutId = setTimeout(attemptUpgrade, 0)

        return () => clearTimeout(timeoutId)
    }, [autoUpgrade, onUpgrade])

    return children
}

// Re-export the hook from the main package for convenience
export { useHydration } from './dist/react-wire-persisted.js'
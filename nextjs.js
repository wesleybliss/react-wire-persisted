'use client'

import { useEffect, useState } from 'react'

/**
 * Simple Next.js App Router compatible component for react-wire-persisted
 * This component handles the localStorage hydration issue in Next.js
 *
 * Usage:
 * import { NextJSHydrationProvider } from 'react-wire-persisted/nextjs'
 *
 * <NextJSHydrationProvider>
 *   <YourApp />
 * </NextJSHydrationProvider>
 */
export function NextJSHydrationProvider({ children }) {
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // Mark as hydrated and try to upgrade storage
        setIsHydrated(true)

        // Dynamically import and upgrade storage after hydration
        if (typeof window !== 'undefined') {
            import('./dist/react-wire-persisted.js')
                .then(module => {
                    // Attempt to upgrade storage
                    if (module.upgradeStorage) {
                        module.upgradeStorage()
                    }
                })
                .catch(err => {
                    console.warn('Failed to upgrade react-wire-persisted storage:', err)
                })
        }
    }, [])

    // Render children immediately, but storage upgrade happens after hydration
    return children
}
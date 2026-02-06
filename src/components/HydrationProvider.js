'use client'

import { useEffect, useRef } from 'react'
import { upgradeStorage } from '../react-wire-persisted.js'
import { getIsClient, getHasHydrated } from '../utils/index.js'

/**
 * A Next.js App Router compatible component that handles automatic storage upgrade
 * after hydration. Use this in your root layout.
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
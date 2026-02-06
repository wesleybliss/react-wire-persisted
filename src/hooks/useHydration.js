'use client'

import { useEffect, useRef } from 'react'
import { upgradeStorage } from '../react-wire-persisted.js'
import { getHasHydrated, getIsClient } from '../utils/index.js'

/**
 * React hook that handles automatic storage upgrade after hydration
 * This should be used in the root component of your application
 *
 * @param {Object} options Configuration options
 * @param {Boolean} options.autoUpgrade Whether to automatically upgrade storage (default: true)
 * @param {Function} options.onUpgrade Callback called when storage is upgraded
 */
export const useHydration = (options = {}) => {
    const { autoUpgrade = true, onUpgrade } = options

    const hasUpgraded = useRef(false)

    useEffect(() => {
        if (!autoUpgrade || hasUpgraded.current || !getIsClient()) return

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

    return {
        hasUpgraded: hasUpgraded.current,
    }
}

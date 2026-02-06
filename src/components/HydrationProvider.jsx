'use client'

import { useHydration } from '../hooks/useHydration.js'

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
    useHydration({ onUpgrade, autoUpgrade })
    return children
}
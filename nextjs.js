'use client'

/**
 * Next.js App Router compatible component for react-wire-persisted
 * This component handles the localStorage hydration issue in Next.js
 *
 * Usage:
 * import { NextJSHydrationProvider } from 'react-wire-persisted/nextjs'
 *
 * <NextJSHydrationProvider>
 *   <YourApp />
 * </NextJSHydrationProvider>
 */

// Re-export HydrationProvider as NextJSHydrationProvider for backwards compatibility
export { HydrationProvider as NextJSHydrationProvider } from './src/components/HydrationProvider.js'

// Also export the main HydrationProvider
export { HydrationProvider } from './src/components/HydrationProvider.js'
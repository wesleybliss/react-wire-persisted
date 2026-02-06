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
// Also export the main HydrationProvider
export { HydrationProvider as NextJSHydrationProvider, HydrationProvider } from './src/components/HydrationProvider.js'

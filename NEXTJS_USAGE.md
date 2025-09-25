# Using react-wire-persisted with Next.js

This package now supports server-side rendering frameworks like Next.js out of the box. The localStorage functionality will gracefully degrade to an in-memory fallback during server-side rendering and automatically upgrade to real localStorage on the client side.

## Basic Usage

### Option 1: Automatic Hydration (Recommended)

#### Next.js App Router (13+)

**Option A: Simple NextJS Provider (Recommended)**

```jsx
// app/layout.js
import { NextJSHydrationProvider } from 'react-wire-persisted/nextjs'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextJSHydrationProvider>
          {children}
        </NextJSHydrationProvider>
      </body>
    </html>
  )
}
```

**Option B: Advanced HydrationProvider**

```jsx
// app/layout.js
import { HydrationProvider } from 'react-wire-persisted/client'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HydrationProvider
          onUpgrade={() => console.log('Storage upgraded!')}
        >
          {children}
        </HydrationProvider>
      </body>
    </html>
  )
}
```

> **Important**: If you encounter "useRef only works in Client Components" errors, use Option A (`/nextjs` import) which is specifically designed for Next.js App Router compatibility.

**Alternative**: If you prefer to create your own component, you can use the hook:

```jsx
// components/MyHydrationProvider.js
'use client'

import { useHydration } from 'react-wire-persisted/client'

export function MyHydrationProvider({ children }) {
  useHydration({
    onUpgrade: () => console.log('Storage upgraded!')
  })
  return children
}
```

#### Next.js Pages Router (12 and below)

```jsx
// pages/_app.js
import { useHydration } from 'react-wire-persisted'

function MyApp({ Component, pageProps }) {
  // This will automatically upgrade to real localStorage after hydration
  useHydration({
    onUpgrade: () => {
      console.log('Storage upgraded to localStorage!')
    }
  })

  return <Component {...pageProps} />
}

export default MyApp
```

### Option 2: Manual Control

If you prefer manual control over when storage is upgraded:

```jsx
import { createPersistedWire, upgradeStorage } from 'react-wire-persisted'
import { useEffect } from 'react'

const userPreferences = createPersistedWire('userPrefs', { theme: 'light' })

function MyComponent() {
  useEffect(() => {
    // Manually upgrade storage after component mounts
    upgradeStorage()
  }, [])

  // Your component logic here
}
```

## How It Works

1. **Server-side rendering**: The package detects when `window` is undefined and automatically uses an in-memory storage fallback
2. **Client-side hydration**: When the component mounts on the client, you can either:
   - Use `useHydration()` hook for automatic upgrade
   - Call `upgradeStorage()` manually
3. **No errors**: You won't see "localStorage not supported" errors anymore

## Key Features

- ✅ **Zero configuration** - Works out of the box with SSR
- ✅ **Automatic fallback** - Uses in-memory storage during SSR
- ✅ **Smooth hydration** - Seamlessly upgrades to localStorage on client
- ✅ **No errors** - Eliminates localStorage access errors in SSR
- ✅ **React hooks** - Convenient `useHydration` hook for automatic setup

## Example: User Preferences

```jsx
// stores/preferences.js
import { createPersistedWire } from 'react-wire-persisted'

export const userTheme = createPersistedWire('theme', 'light')
export const userLanguage = createPersistedWire('language', 'en')

// components/ThemeToggle.js
import { userTheme } from '../stores/preferences'

export function ThemeToggle() {
  const [theme, setTheme] = userTheme.use()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme: {theme}
    </button>
  )
}

// For Next.js App Router - app/layout.js
import { NextJSHydrationProvider } from 'react-wire-persisted/nextjs'
import { ThemeToggle } from '../components/ThemeToggle'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextJSHydrationProvider>
          <ThemeToggle />
          {children}
        </NextJSHydrationProvider>
      </body>
    </html>
  )
}

// For Next.js Pages Router - pages/_app.js
import { useHydration } from 'react-wire-persisted'
import { ThemeToggle } from '../components/ThemeToggle'

function MyApp({ Component, pageProps }) {
  useHydration() // Automatic storage upgrade

  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  )
}
```

## Migration from v1.4.x

No changes are required! Your existing code will continue to work. The new SSR support is enabled automatically.

If you were previously handling localStorage errors manually, you can remove that code as the package now handles it internally.
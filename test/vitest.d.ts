import 'vitest'
import type React from 'react'

declare module '*.jsx'
declare module '../../../demo/src/components/App' {
    const App: React.FC
    export default App
}

declare module 'vitest' {
    interface Assertion<T = unknown> {
        toMatchDiffSnapshot(...args: unknown[]): T
    }

    interface AsymmetricMatchersContaining {
        toMatchDiffSnapshot(...args: unknown[]): void
    }
}

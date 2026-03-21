import 'vitest'
declare module '*.jsx'
declare module '../../../demo/src/components/App' {
    const App: any
    export default App
}

declare module 'vitest' {
    interface Assertion<T = any> {
        toMatchDiffSnapshot(...args: unknown[]): T
    }

    interface AsymmetricMatchersContaining {
        toMatchDiffSnapshot(...args: unknown[]): void
    }
}

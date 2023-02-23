import { defineConfig } from 'vitest/config'

const config = {
    test: {
        // https://vitest.dev/config
        globals: true,
        environment: 'jsdom',
        
        include: [
            `**/tests/src/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`,
        ],

        // open: true, // experimental
        // silent: true,

        // setupFiles: ['./src/setupTests.ts']
        // globalSetup: [],
        coverage: {
            provider: 'c8',
            reporter: ['text', 'html'],
            include: [
                '**/tests/src/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            ],
            exclude: [
                'node_modules/',
            ],

            // 'reports-dir': __dirname + '/coverage'
        },
    },
}

export default defineConfig(config)

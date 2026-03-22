import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig, type UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { getEnvironmentVars, loadEnvironment } from './config/environment'
import developmentConfig from './config/vite.config.development'
import productionConfig from './config/vite.config.production'
import testingConfig from './config/vite.config.testing'

const env = getEnvironmentVars()
const isProduction = process.env.NODE_ENV === 'production'

const excludedFiles = [
    'demo/**',
]

const resolvedExcludes = excludedFiles
    .map(p => path.resolve(__dirname, p))

const config = {
    root: __dirname,
    define: loadEnvironment(env),
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            'react-wire-persisted': path.resolve(__dirname, '../src'),
            src: path.resolve(__dirname, 'src'),
            tests: path.resolve(__dirname, 'tests'),
        },
    },
    build: {
        sourcemap: !!process.env.SOURCEMAPS || isProduction,
        rollupOptions: {
            external: resolvedExcludes,
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                },
            },
        },
    },
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    server: {
        port: parseInt(process.env?.PORT ?? '3000', 10),
    },
} satisfies UserConfig

const mainConfig = mergeConfig(defineConfig(config), testingConfig)
const extraConfig = isProduction ? productionConfig : developmentConfig

export default mergeConfig(mainConfig, extraConfig)

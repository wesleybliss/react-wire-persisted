import { defineConfig, mergeConfig, splitVendorChunkPlugin as vendor } from 'vite'
import react from '@vitejs/plugin-react'
import { getEnvironmentVars, loadEnvironment } from './config/environment'
import testingConfig from './config/vite.config.testing'
import developmentConfig from './config/vite.config.development'
import productionConfig from './config/vite.config.production'

const env = getEnvironmentVars()
const isProduction = process.env.NODE_ENV === 'production'

const config = {
    root: __dirname,
    define: loadEnvironment(env),
    plugins: [
        react(),
    ],
    build: {
        sourcemap: process.env.SOURCEMAPS || isProduction,
    },
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    server: {
        port: process.env.PORT || 3000,
    },
}

const mainConfig = mergeConfig(defineConfig(config), testingConfig)
const extraConfig = isProduction ? productionConfig : developmentConfig

export default mergeConfig(
    mainConfig,
    extraConfig,
)

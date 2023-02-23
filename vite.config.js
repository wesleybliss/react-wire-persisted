import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import { getEnvironmentVars, loadEnvironment } from './config/environment'
import aliases from './config/aliases'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

const env = getEnvironmentVars()

const developmentConfig = {
    server: {
        port: process.env.PORT || 3000,
    },
}

const productionConfig = {
    build: {
        rollupOptions: {
            // @todo investigate if this is useful
            /* input: {
                main: path.resolve(__dirname, '../src/index.html'),
                dashboard: path.resolve(__dirname, '../dashboard/index.html'),
            }, */
            plugins: [
                injectProcessEnv(env, { verbose: false }),
            ],
        },
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    define: loadEnvironment(env),
    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
                // ...svgr options (https://react-svgr.com/docs/options/)
            },
        }),
    ],
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    resolve: {
        alias: aliases,
    },
    ...(process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig),
})

import * as path from 'node:path'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import { getEnvironmentVars } from './environment'

const env = getEnvironmentVars()

const productionConfig = {
    build: {
        lib: {
            entry: path.resolve(__dirname, '../src/index.js'),
            name: 'react-wire-persisted',
            fileName: 'react-wire-persisted',
            // formats: ['cjs', 'es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@forminator/react-wire'],
            plugins: [injectProcessEnv(env, { verbose: false })],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@forminator/react-wire': 'reactWire',
                },
            },
        },
    },
}

export default productionConfig

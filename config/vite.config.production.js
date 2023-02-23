import * as path from 'path'
import { getEnvironmentVars } from './environment'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

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
            external: [
                'react',
                'react-dom',
                '@forminator/react-wire',
            ],
            plugins: [
                injectProcessEnv(env, { verbose: false }),
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
            },
        },
    },
}

export default productionConfig

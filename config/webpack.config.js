const pkg = require('../package.json')
const paths = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const createConfig = options => {
    
    const config = {
        mode: process.env.NODE_ENV,
        entry: {
            [pkg.name]: paths.src('index.ts'),
            ['utils/index']: paths.src('utils/index.ts'),
        },
        name: options.target,
        target: 'web',
        output: {
            clean: false,
            path: paths.lib(),
            filename: `[name].${options.target}.js`,
            library: {
                name: pkg.name,
                type: options.target,
            },
            libraryTarget: options.target,
            // libraryExport: 'default',
            umdNamedDefine: true,
            globalObject: 'this' // `typeof self !== 'undefined' ? self : this`,
        },
        module: {
            rules,
        },
        plugins,
        resolve: {
            modules: [
                paths.root('node_modules'),
                paths.src(),
            ],
            extensions: ['.ts', '.js', '.json'],
        },
    }
    
    if (options.target === 'module') {
        delete config.output.library.name
        config.experiments = {
            outputModule: true,
        }
    }

    if (config.mode === 'production') {
        
        config.devtool = false
        config.externals = [nodeExternals()]
        config.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
            ],
            splitChunks: false,
        }
        config.performance = {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        }
        
    } else {
        
        config.entry.demo = paths.demo('src/index.js')
        config.devtool = 'inline-source-map'
        config.devServer = {
            historyApiFallback: true,
            static: {
                directory: paths.demo('public'),
                publicPath: '/',
            },
            open: false,
            compress: true,
            hot: true,
            host: '0.0.0.0',
            port: process.env.PORT || 3002,
        }
        
    }
    
    return config
    
}

/* module.exports = createVariants({
    target: ['var', 'commonjs2', 'umd', 'amd'],
}, createConfig) */

module.exports = process.env.NODE_ENV !== 'production'
    ? createConfig({ target: 'module' })
    : ['commonjs2', 'umd', 'umd2', 'amd', 'module'].map(it => createConfig({ target: it }))

module.exports.parallelism = 5

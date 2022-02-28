const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')
const paths = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const outputFile = (process.env.NODE_ENV === 'production')
    ? `${pkg.name}.min.js`
    : `${pkg.name}.js`

const componenentExcludes = [
    'src/index.js',
    'stories.jsx',
]

/**
 * Builds a list of components so Webpack can create
 * separate entries & transpiled files for individual import
 * 
 * @param {String} root Root directory to start with
 * @returns {Array} List of entries
 */
const buildComponentList = root => {
    
    let list = []
    const nodes = fs.readdirSync(root)
    
    nodes.forEach(it => {
        const node = path.resolve(root, it)
        if (componenentExcludes.some(ex => it.endsWith(ex))) return
        if (fs.statSync(node).isFile())
            list.push(node)
        else if (fs.statSync(node).isDirectory())
            list = [ ...list, ...buildComponentList(node) ]
    })
    
    return list
    
}

const makeEntry = file => {
    const name = file.replace(`${paths.src()}/`, '')
    return name.substring(0, name.length - path.extname(name).length) // + `.min`
}

const components = buildComponentList(paths.src())
const entries = components.reduce((acc, it) => ({
    ...acc,
    [makeEntry(it)]: it,
}), {})
console.log('entries', JSON.stringify(entries, null, 4))
const config = {
    mode: process.env.NODE_ENV,
    // entry: [paths.src('index.js')],
    entry: entries,
    target: 'web',
    output: {
        clean: true,
        path: paths.lib(),
        // filename: outputFile,
        library: pkg.name,
        libraryTarget: 'umd',
        libraryExport: 'default',
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
        extensions: ['.js', '.json'],
    },
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
        // splitChunks: false,
    }
    config.performance = {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    }
    
} else {
    
    config.entry.push(paths.demo('src/index.js'))
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

module.exports = config

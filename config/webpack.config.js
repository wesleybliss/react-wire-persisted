const pkg = require('../package.json')
const paths = require('./paths')
const rules = require('./rules')
const plugins = require('./plugins')

const mode = process.env.NODE_ENV

const outputFile = (mode === 'production')
    ? `${pkg.name}.min.js`
    : `${pkg.name}.js`

const config = {
    mode: mode,
    entry: [paths.src('index.js')],
    devtool: 'source-map',
    output: {
        path: paths.lib(),
        filename: outputFile,
        library: pkg.name,
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: `typeof self !== 'undefined' ? self : this`,
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

if (mode !== 'production') {
    config.entry.push(paths.demo('src/index.js'))
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

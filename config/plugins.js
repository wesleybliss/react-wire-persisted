const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require('../package.json')
const paths = require('./paths')

const plugins = {}

plugins.production = []

plugins.development = [
    ...plugins.production,
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.TITLE': JSON.stringify(pkg.name),
    }),
    new HtmlWebpackPlugin({
        title: pkg.name,
        template: paths.demo('public/index.html'),
        filename: 'index.html',
        templateParameters: {},
    }),
    new InterpolateHtmlPlugin({
        'TITLE': pkg.name,
    }),
]

module.exports = [
    ...(process.env.NODE_ENV === 'production'
        ? plugins.production
        : plugins.development
    ),
    (process.env.ANALYZE_BUNDLE === 'true') && new BundleAnalyzerPlugin(),
].filter(Boolean)

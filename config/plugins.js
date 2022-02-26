const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const pkg = require('../package.json')
const paths = require('./paths')

const plugins = [
    new CleanWebpackPlugin(),
]

if (process.env.NODE_ENV !== 'production') {
    
    plugins.unshift(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.TITLE': JSON.stringify(pkg.name),
        })
    )
    
    plugins.push(
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: paths.demo('public/index.html'),
            filename: 'index.html',
            templateParameters: {},
        })
    )
    
    plugins.push(
        new InterpolateHtmlPlugin({
            'TITLE': pkg.name,
        })
    )
    
}

module.exports = plugins

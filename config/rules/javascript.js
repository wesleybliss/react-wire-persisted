
module.exports = {
    test: /(\.js|\.jsx)$/,
    use: {
        loader: 'babel-loader',
    },
    exclude: /node_modules/,
}

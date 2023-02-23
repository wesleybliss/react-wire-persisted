
module.exports = {
    test: /(\.ts|\.js|\.jsx)$/,
    use: {
        loader: 'babel-loader',
    },
    exclude: /node_modules/,
}

const paths = require('../paths')

module.exports = {
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
    ],
    include: [
        paths.src(),
        process.env.NODE_ENV !== 'production' && paths.demo('src'),
        /node_modules/
    ].filter(Boolean),
}

const path = require('path')

module.exports = {
    entry: path.resolve('src/downloader.js'),
    output: {
        path: path.resolve('dist'),
        filename: 'async-downloader.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
}

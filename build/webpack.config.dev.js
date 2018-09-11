const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: path.resolve('demo/index.js'),
    output: {
        path: path.resolve('dist'),
        filename: 'async-downloader.js',
    },
    devServer: {
        contentBase: path.resolve('dist'),
        compress: true,
        port: 4000,
        open: true,
    },
    devtool: 'eval-source-map',
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('demo/index.html'),
        }),
    ],
}

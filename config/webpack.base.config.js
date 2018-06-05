'use strict'

const path = require('path')
const {checkVersion} = require('./utils')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

checkVersion()

module.exports = {
    output: {
        publicPath: '/'
    },
    resolve: {
        alias: {
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'directives': path.resolve(__dirname, '../src/directives'),
            'pages': path.resolve(__dirname, '../src/pages'),
            'store': path.resolve(__dirname, '../src/store'),
            'router': path.resolve(__dirname, '../src/router'),
            'utils': path.resolve(__dirname, '../src/utils')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/,
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                include: [path.resolve(__dirname, '../src')],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: path.resolve(__dirname, '../dist/index.html'),
            favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico')
        })
    ]
}

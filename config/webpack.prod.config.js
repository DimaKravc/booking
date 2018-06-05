'use strict'

const merge = require('webpack-merge')
const {getLoaders} = require('./utils')
const config = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(config, {
    output: {
        filename: '[name].bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: getLoaders({extract: true})
    },
    devtool: 'none',
    plugins: [
        new ExtractTextPlugin('styles.min.css')
    ]
})

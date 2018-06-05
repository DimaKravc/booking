'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const {getLoaders} = require('./utils')
const config = require('./webpack.base.config')

module.exports = merge(config, {
    mode: process.env.NODE_ENV,
    module: {
        rules: getLoaders()
    },
    devtool: 'inline-cheap-module-source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

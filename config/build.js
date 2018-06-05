'use strict'

require('shelljs/global')

process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.prod.config')

rm('-rf', path.join(__dirname, '../dist'))
mkdir('-p', path.join(__dirname, '../dist'))

webpack(config, (err, stats) => {
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})

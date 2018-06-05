'use strict'

require('shelljs/global')

process.env.NODE_ENV = 'development'

const path = require('path')
const serve = require('webpack-serve')
const config = require('./webpack.dev.config')

const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

rm('-rf', path.join(__dirname, '../dist'))

serve({
    config,
    dev: {
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    },
    content: path.join(__dirname, '../dist'),
    host: 'localhost',
    port: 9000,
    hot: true,
    add: (app, middleware, options) => {
        app.use(convert(history({})))
    }
})


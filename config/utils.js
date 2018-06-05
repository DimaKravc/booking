'use strict'

const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')

let exec = cmd => {
    return require('child_process').execSync(cmd).toString().trim()
}

let versionRequirements = [
    {
        name: 'node',
        currentVersion: exec('node --version').replace(/v/g, ''),
        versionRequirement: packageConfig.engines.node
    },
    {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    }
]

let checkVersion = () => {
    let warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        let mod = versionRequirements[i]

        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' + chalk.red(mod.currentVersion) + ' should be ' + chalk.green(mod.versionRequirement))
        }
    }

    if (warnings.length) {
        console.log(chalk.yellow('To use this template, you must update following to modules:'))

        for (let i = 0; i < warnings.length; i++) {
            console.log('  ' + warnings[i])
        }

        process.exit(1)
    }
}

let configureLoaders = (options = {}) => {
    let cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: process.env.NODE_ENV === 'development'
        }
    }

    let postCSSLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: process.env.NODE_ENV === 'development',
            plugins: [
                autoprefixer({
                    browsers: ['last 2 version']
                }),
                mqpacker()
            ]
        }
    }

    let generateLoader = (loader, loaderOption) => {
        let loaders = [cssLoader, postCSSLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOption, {
                    sourceMap: process.env.NODE_ENV === 'development'
                })
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoader(),
        postcss: generateLoader(),
        less: generateLoader('less'),
        sass: generateLoader('sass', {indentedSyntax: true}),
        scss: generateLoader('sass'),
        stylus: generateLoader('stylus'),
        styl: generateLoader('stylus')
    }
}

let getLoaders = options => {
    let output = []
    let loaders = configureLoaders(options)

    for (let extension in loaders) {
        let loader = loaders[extension]

        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader
        })
    }

    return output
}

module.exports = {
    checkVersion,
    getLoaders
}

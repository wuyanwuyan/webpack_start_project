var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')


var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
console.log('+++++++++++++++++++++', path)

module.exports = {
    context: SRC_PATH,
    entry: {
        mainPage: './main/index',
        vendors: ['./libs/jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery1: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    }
}


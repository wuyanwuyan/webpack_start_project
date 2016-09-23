var webpack = require('webpack')
var path = require('path')


const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')



var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
console.log('+++++++++++++++++++++',path)

module.exports = {
  context: __dirname + "/src",
  entry: {
    mainPage:'./main/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CommonsChunkPlugin("common.js", ["./libs/bootstrap/js/npm.js"])
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  resolveLoader:  {
    root: path.join(__dirname, "node_modules") 
  }
}


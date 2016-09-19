var webpack = require('webpack')
var path = require('path')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
console.log('+++++++++++++++++++++',path)

module.exports = {
  context: __dirname + "/src",
  entry: './main/index.js',
  output: {
    path: "dist",
    filename: 'bundle.js'
  },
  plugins: [
    new CommonsChunkPlugin("common.js", ["./libs/bootstrap/js/npm.js"])
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
}


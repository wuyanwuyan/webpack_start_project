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
    new webpack.ProvidePlugin({
      $: './libs/jquery'
    }),//这个可以使jquery变成全局变量，妮不用在自己文件require('jquery')了
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//这是妮第三方库打包生成的文件
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  resolveLoader:  {
    root: path.join(__dirname, "node_modules") 
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      jquery: "jquery/src/jquery"
    }
  }
}


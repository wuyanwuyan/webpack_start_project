var webpack = require('webpack')

module.exports = {
  context: __dirname + "/app",
  entry: './main/index.js',
  output: {
    path: dist,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
}
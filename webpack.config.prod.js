// webpack.config.prod.js
var path              = require('path')
var webpack           = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html$/,
      loader: 'raw-loader' // loaders: ['raw-loader'] is also perfectly acceptable.
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
}

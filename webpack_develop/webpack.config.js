const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') // 访问内置组件

module.exports = {
  entry: '',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, user: 'raw-loader' },
      { test: /\.css$/, user: 'css-loader' },
      { test: /\.ts$/, user: 'ts-loader' },
      { test: /\.(js|jsx)$/, user: 'babel-loader' }
    ]
  },
  plugin: [
    // ProgressPlugin 用于自定义编译过程中的进度报告，HtmlWebpackPlugin 将生成一个 HTML 文件，并在其中使用 script 引入一个 -webpack.bundle.js 的 JS 文件
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
}

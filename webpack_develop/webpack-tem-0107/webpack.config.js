const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function generateHtml(opt) {
  return new HtmlWebpackPlugin(Object.assign({
    template: './src/app/layout/layout.html',
    chunksSortMode: 'manual',
    minify: {
      collapseWhitespace: true,
      html5: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeTagWhitespace: true
    }
  }, opt))
}

module.exports = {
  mode: 'development',
  entry: {
    index: './src/app/home/index.js',
    layout: './src/app/layout/layout.js',
    virtualClusters: './src/app/vc/vc.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'webpack title',
    //   template: path.resolve(__dirname, './src/app/template/index.html'),
    //   filename: 'index.html',
    //   chunks: ['index']
    // })
    generateHtml({
      title: '页面1',
      filename: 'index.html',
      chunks: ['index'],
      template: path.resolve(__dirname, './src/app/home/index.html'),
    }),
    generateHtml({
      title: '页面-VC',
      // filename: 'VC.html',
      // chunks: ['index'],
      // template: path.resolve(__dirname, './src/app/template/index.html'),
      filename: 'virtual-clusters.html',
      chunks: ['layout', 'virtualClusters'],
    })
  ]
}

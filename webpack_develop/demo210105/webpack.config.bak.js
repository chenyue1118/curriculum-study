const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  entry: {
    // index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js'
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  plugins: [
    new CleanWebpackPlugin({
      // cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      title: '管理- Development'
    })
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/'
  },
  // optimization: {
  //   // runtimeChunk: 'single'
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  }
};

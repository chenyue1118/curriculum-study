const path = require('path');

// module.exports = env => {
//   console.log('NODE_ENV', env.NODE_ENV);
//   console.log('Production', end.production);
//
//   return {
//     entry: './src/index.js',
//     output: {
//       filename: 'bundle.js',
//       path: path.resolve(__dirname, 'dist')
//     },
//     module: {
//       rules: [
//         // {
//         //   test: /\.js$/,
//         //   loader: 'babel-loader'
//         // }
//         {
//           test: /\.js$/,
//           include: path.resolve(__dirname, 'src'),
//           loader: 'babel-loader'
//         }
//       ]
//     }
//   };
// }

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'webpack-numbers.js',
//     library: 'webpackNumbers',
//     librarytarget: 'umd'
//   },
//   externals: {
//     lodash: {
//       commonjs: 'lodash',
//       commonjs2: 'lodash',
//       amd: 'lodash',
//       root: '_'
//     }
//   }
// }

// module.exports = [
//   'source-map'
// ].map(devtool => ({
//   mpde: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'webpack-numbers.js'
//   },
//   devtool,
//   optimization: {
//     runtimeChunk: true
//   }
// }))

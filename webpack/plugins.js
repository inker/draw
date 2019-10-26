const webpack = require('webpack')

// const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { compact } = require('lodash')

const getCurrentDate = require('./utils/getCurrentDate')
const getLastCommitHash = require('./utils/getLastCommitHash')
const chunkToName = require('./utils/chunkToName')

const currentDate = getCurrentDate()
const lastCommitHash = getLastCommitHash()

module.exports = (env) => compact([
  // new OccurrenceOrderPlugin(),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env === 'dev' ? 'development' : 'production'),
    },
    __MODIFICATION_DATE__: JSON.stringify(currentDate),
    __VERSION__: JSON.stringify(lastCommitHash),
  }),

  env === 'dev' && new webpack.HotModuleReplacementPlugin(),

  new webpack.NamedChunksPlugin(chunkToName),

  // new (env === 'dev' ? NamedModulesPlugin : HashedModuleIdsPlugin)(),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/template.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  // new CopyWebpackPlugin([
  //   {
  //     from: 'src/404.html',
  //   }
  // ]),

  env === 'analyze' && new BundleAnalyzerPlugin(),
])

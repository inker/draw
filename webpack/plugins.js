const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { compact } = require('lodash')

const getCurrentDate = require('./utils/getCurrentDate')
const getLastCommitHash = require('./utils/getLastCommitHash')

const currentDate = getCurrentDate()
const lastCommitHash = getLastCommitHash()

module.exports = (isDev) => compact([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
    },
    __MODIFICATION_DATE__: JSON.stringify(currentDate),
    __VERSION__: JSON.stringify(lastCommitHash),
  }),

  isDev && new webpack.HotModuleReplacementPlugin(),

  !isDev && new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),

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

  process.env.npm_config_report && new BundleAnalyzerPlugin(),
])

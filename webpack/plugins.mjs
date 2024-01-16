import webpack from 'webpack'

// @ts-expect-error No types
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import getCurrentDate from './utils/getCurrentDate.mjs'
import getLastCommitHash from './utils/getLastCommitHash.mjs'

const currentDate = getCurrentDate()
const lastCommitHash = getLastCommitHash()

/**
 * @param {boolean} isDev
 * @returns {import('webpack').Configuration['plugins']}
 */
export default isDev => [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
    },
  }),

  isDev && new CleanTerminalPlugin(),

  !isDev &&
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
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
    meta: {
      version: lastCommitHash,
      'modification-date': currentDate,
    },
  }),

  // new CopyWebpackPlugin([
  //   {
  //     from: 'src/404.html',
  //   }
  // ]),

  isDev && new ForkTsCheckerWebpackPlugin(),

  isDev &&
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      emitWarning: true,
      failOnError: false,
      cache: true,
    }),

  process.env.npm_config_report && new BundleAnalyzerPlugin(),
].filter(Boolean)

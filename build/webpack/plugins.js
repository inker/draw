const webpack = require('webpack');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getCurrentDate = require('./utils/getCurrentDate');
const getLastCommitHash = require('./utils/getLastCommitHash');

const currentDate = getCurrentDate();
const lastCommitHash = getLastCommitHash();

/**
 * @param {boolean} isDev
 * @returns {import('webpack').Configuration['plugins']}
 */
module.exports = isDev =>
  [
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
  ].filter(Boolean);

const Path = require('path');

const { rspack } = require('@rspack/core');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const ESLintPlugin = require('eslint-rspack-plugin').default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getCurrentDate = require('./utils/getCurrentDate');
const getLastCommitHash = require('./utils/getLastCommitHash');

const currentDate = getCurrentDate();
const lastCommitHash = getLastCommitHash();

/**
 * @param {boolean} isDev
 * @returns {import('@rspack/core').Configuration['plugins']}
 */
module.exports = isDev =>
  [
    new rspack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
      },
    }),

    isDev && new CleanTerminalPlugin(),

    !isDev &&
      new rspack.CssExtractRspackPlugin({
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

    isDev && new TsCheckerRspackPlugin(),

    isDev &&
      new ESLintPlugin({
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        severity: {
          error: 'warning',
        },
        cache: true,
        // Left to itself the plugin loads the eslint 10 installed under build,
        // which only reads flat config & so finds no config at all.
        // The app is linted by the root's eslint 8 & its .eslintrc.cjs.
        eslintPath: require.resolve('eslint', {
          paths: [Path.resolve(__dirname, '../..')],
        }),
        configType: 'eslintrc',
      }),

    process.env.npm_config_report && new BundleAnalyzerPlugin(),
  ].filter(Boolean);

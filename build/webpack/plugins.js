const Path = require('path');

const { rspack } = require('@rspack/core');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const ESLintPlugin = require('eslint-rspack-plugin').default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const getCurrentDate = require('./utils/getCurrentDate');
const getLastCommitHash = require('./utils/getLastCommitHash');

const currentDate = getCurrentDate();
const lastCommitHash = getLastCommitHash();

// 3J clears the scrollback as well as the screen,
// so scrolling up doesn't show an earlier rebuild's errors.
const clearTerminalPlugin = {
  apply(compiler) {
    compiler.hooks.afterCompile.tap('ClearTerminalPlugin', () => {
      if (compiler.watchMode) {
        process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
      }
    });
  },
};

/**
 * @param {boolean} isDev
 * @returns {import('@rspack/core').Configuration['plugins']}
 */
module.exports = isDev =>
  [
    isDev && clearTerminalPlugin,

    new rspack.HtmlRspackPlugin({
      filename: 'index.html',
      template: 'src/template.html',
      minify: true,
      meta: {
        version: lastCommitHash,
        'modification-date': currentDate,
      },
    }),

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

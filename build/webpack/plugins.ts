import { createRequire } from 'module';
import Path from 'path';

import { rspack } from '@rspack/core';
import type { Plugins, RspackPluginInstance } from '@rspack/core';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';
import ESLintPlugin from 'eslint-rspack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import getCurrentDate from './utils/getCurrentDate.ts';
import getLastCommitHash from './utils/getLastCommitHash.ts';

const require = createRequire(import.meta.url);

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
} as const satisfies RspackPluginInstance;

export default (isDev: boolean) =>
  (
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
            paths: [Path.resolve(import.meta.dirname, '../..')],
          }),
          configType: 'eslintrc',
        }),

      process.env.npm_config_report && new BundleAnalyzerPlugin(),
    ] as const satisfies Plugins
  ).filter(Boolean);

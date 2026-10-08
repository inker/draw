import { rspack } from '@rspack/core';
import type { Plugins, RspackPluginInstance } from '@rspack/core';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';
import ESLintPlugin from 'eslint-rspack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import getCurrentDate from './utils/getCurrentDate.ts';
import getLastCommitHash from './utils/getLastCommitHash.ts';

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
        }),

      process.env.npm_config_report && new BundleAnalyzerPlugin(),
    ] as const satisfies Plugins
  ).filter(Boolean);

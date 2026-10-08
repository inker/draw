import { createRequire } from 'node:module';
import path from 'node:path';

import type { Configuration } from '@rspack/core';

import optimization from './optimization.ts';
import rules from './rules.ts';
import plugins from './plugins.ts';
import devServer from './devServer.ts';

const require = createRequire(import.meta.url);

type Env = {
  dev?: boolean;
  out?: string;
};

const defaultEnv = {
  dev: false,
  out: 'dist',
};

export default (env: Env) => {
  console.log('passed env:', env);
  const envOptions = {
    ...defaultEnv,
    ...env,
  };
  console.log('resulting env:', envOptions);

  const isDev = envOptions.dev;
  const outDir = envOptions.out;
  const rootDir = path.resolve(import.meta.dirname, '../..');
  const distDir = path.resolve(rootDir, outDir);

  return {
    mode: isDev ? 'development' : 'production',
    target: 'web',
    context: rootDir,
    entry: {
      app: './src/index.tsx',
    },
    output: {
      clean: true,
      path: distDir,
      filename: `[name]${isDev ? '' : '.[contenthash:8]'}.js`,
      cssFilename: `[name]${isDev ? '' : '.[contenthash:8]'}.css`,
      hashDigest: 'base64url',
    },
    cache: {
      type: 'persistent',
      buildDependencies: [import.meta.filename],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: isDev
        ? undefined
        : {
            lodash: require.resolve('lodash-es'),
          },
      tsConfig: path.resolve(rootDir, 'tsconfig.json'),
    },
    devtool: isDev ? 'eval-source-map' : undefined,
    optimization: optimization(),
    module: {
      rules: rules(isDev),
    },
    plugins: plugins(isDev),
    devServer: isDev ? devServer : undefined,
  } as const satisfies Configuration;
};

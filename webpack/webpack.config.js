const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const optimization = require('./optimization')
const rules = require('./rules')
const plugins = require('./plugins')
const devServer = require('./devServer')

const defaultEnv = {
  dev: false,
  out: 'dist',
}

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = env => {
  console.log('passed env:', env)
  const envOptions = {
    ...defaultEnv,
    ...env,
  }
  console.log('resulting env:', envOptions)

  const isDev = envOptions.dev
  const outDir = envOptions.out
  const rootDir = path.resolve(__dirname, '..')
  const distDir = path.resolve(rootDir, outDir)

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
      sourceMapFilename: '[file].map',
      globalObject: isDev ? 'this' : undefined, // TODO
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: isDev
        ? undefined
        : {
            lodash: require.resolve('lodash-es'),
            // 'react': path.join(rootDir, 'node_modules/react/dist/react.min.js'),
            // 'react-dom': path.join(rootDir, 'node_modules/react-dom/dist/react-dom.min.js'),
          },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(rootDir, 'tsconfig.json'),
        }),
      ],
    },
    devtool: isDev ? 'eval-source-map' : undefined,
    optimization: optimization(isDev),
    module: {
      rules: rules(isDev),
    },
    plugins: plugins(isDev),
    devServer: isDev ? devServer : undefined,
  }
}

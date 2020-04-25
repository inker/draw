const path = require('path')

const optimization = require('./optimization')
const rules = require('./rules')
const plugins = require('./plugins')

const rootDir = process.cwd()

const defaultEnv = {
  dev: false,
  out: 'dist',
}

module.exports = (env) => {
  console.log('passed env:', env)
  const envOptions = {
    ...defaultEnv,
    ...env,
  }
  console.log('resulting env:', envOptions)

  const isDev = envOptions.dev
  const outDir = envOptions.out
  const distDir = path.join(rootDir, outDir)

  return {
    mode: isDev ? 'development' : 'production',
    target: 'web',
    entry: {
      app: './src/index.tsx',
    },
    output: {
      path: distDir,
      filename: isDev ? '[name].js' : '[name].[chunkhash].js',
      sourceMapFilename: '[file].map',
      globalObject: isDev ? 'this' : undefined, // TODO
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
      ],
      modules: [
        path.resolve(rootDir, 'src'),
        'node_modules',
      ],
      // alias: isDev ? undefined : {
      //   'react': path.join(rootDir, 'node_modules/react/dist/react.min.js'),
      //   'react-dom': path.join(rootDir, 'node_modules/react-dom/dist/react-dom.min.js'),
      // },
    },
    devtool: isDev ? 'source-map' : undefined,
    optimization: optimization(isDev),
    module: {
      rules: rules(isDev),
    },
    plugins: plugins(isDev),
    devServer: {
      contentBase: distDir,
      port: 9080,
      compress: !isDev,
      historyApiFallback: {
        rewrites: [
          {
            from: /./,
            to: '/404.html',
          },
        ],
      },
      open: true,
    },
  }
}

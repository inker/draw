const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (isDev) => ({
  minimize: true,

  minimizer: isDev ? undefined : [
    new TerserPlugin(),

    new CssMinimizerPlugin(),
  ],

  runtimeChunk: 'single',

  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      defaultVendors: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendor',
        priority: -10000,
        enforce: true,
      },
      react: {
        test: /[/\\]react(-dom)?[/\\]/,
        chunks: 'initial',
        name: 'react',
        enforce: true,
        reuseExistingChunk: true,
      },
      lodash: {
        test: /[/\\]lodash[/\\]/,
        chunks: 'initial',
        name: 'lodash',
        priority: -5000,
        enforce: true,
        reuseExistingChunk: true,
      },
      normalize: {
        test: /[/\\]normalize.css[/\\]/,
        chunks: 'initial',
        name: 'normalize',
        enforce: true,
        reuseExistingChunk: true,
      },
    },
  },
})

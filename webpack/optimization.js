const TerserPlugin = require('terser-webpack-plugin')

module.exports = (isDev) => ({
  minimize: true,
  minimizer: isDev ? undefined : [
    new TerserPlugin(),
  ],

  runtimeChunk: true,
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
      moment: {
        test: /[/\\]moment(-timezone)?[/\\]/,
        chunks: 'initial',
        name: 'moment',
        enforce: true,
        reuseExistingChunk: true,
      },
    },
  },
})

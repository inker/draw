const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = (isDev) => ({
  runtimeChunk: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // vendor: {
      vendors: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendors',
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
  minimizer: isDev ? undefined : [
    new TerserWebpackPlugin(),
  ],
  // minimizer: isDev ? undefined : [
  //   new UglifyJsPlugin({
  //     uglifyOptions: {
  //       compress: {
  //         warnings: true,
  //         dead_code: true,
  //         properties: true,
  //         unused: true,
  //         join_vars: true,
  //         conditionals: false, // to fix firefox
  //       },
  //       // mangle: {
  //       //   safari10: true,
  //       // },
  //       output: {
  //         comments: false,
  //       },
  //     },
  //     // sourceMap: true, // retains sourcemaps for typescript
  //   }),
  // ],
})

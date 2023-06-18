const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (isDev) => ({
  minimize: true,

  minimizer: isDev
    ? undefined
    : [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),

      new CssMinimizerPlugin(),
    ],

  runtimeChunk: 'single',

  splitChunks: {
    chunks: 'all',
    name: (module, chunks) => chunks.map(item => item.name).join('~'),
    cacheGroups: {
      defaultVendors: {
        test: /node_modules/,
        chunks: 'initial',
        name: 'vendors-other',
        priority: -10000,
        enforce: true,
      },
      lodash: {
        test: /[/\\]lodash(-es)?[/\\]/,
        chunks: 'initial',
        name: 'vendors-lodash',
        priority: -5000,
        enforce: true,
        reuseExistingChunk: true,
      },
      react: {
        test: /[/\\]react(-dom)?[/\\]/,
        chunks: 'initial',
        name: 'vendors-react',
        enforce: true,
        reuseExistingChunk: true,
      },
      normalize: {
        test: /[/\\]normalize.css[/\\]/,
        chunks: 'initial',
        name: 'vendors-normalize',
        enforce: true,
        reuseExistingChunk: true,
      },

      asyncVendors: {
        test: /node_modules/,
        chunks: 'async',
        enforce: true,
        reuseExistingChunk: true,
        name: (module, chunks /* , cacheGroupKey */) => {
          // const moduleFileName = module
          //   .identifier()
          //   .split('/')
          //   .reduceRight(item => item);
          const allChunksNames = chunks.map(item => item.name).join('~')
          // return `${cacheGroupKey}--${allChunksNames}--${moduleFileName}`;
          // return `${cacheGroupKey}--${allChunksNames}`;
          return `vendors-${allChunksNames}`
        },
      },
    },
  },
})

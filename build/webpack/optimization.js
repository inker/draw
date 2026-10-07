const { rspack } = require('@rspack/core');

// rspack leaves some worker chunks unnamed & has no debugId to stand in,
// so a set with one of those gets no name at all,
// rather than one that could match another set's & merge the two chunks.
const joinChunkNames = chunks =>
  chunks.every(item => item.name)
    ? chunks.map(item => item.name).join('~')
    : undefined;

/**
 * @returns {import('@rspack/core').Configuration['optimization']}
 */
module.exports = () => ({
  minimize: true,

  minimizer: [
    new rspack.SwcJsMinimizerRspackPlugin(),

    new rspack.LightningCssMinimizerRspackPlugin({
      minimizerOptions: {
        // Older targets make it rewrite light-dark() into variables
        // that only work when color-scheme is set in CSS,
        // but App.tsx sets it from JS, so every colour using it breaks.
        // These are the first versions with light-dark() built in.
        targets: 'chrome >= 123, edge >= 123, firefox >= 120, safari >= 17.5',
      },
    }),
  ],

  runtimeChunk: 'single',

  splitChunks: {
    chunks: 'all',
    name: (module, chunks) => joinChunkNames(chunks),
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
          const allChunksNames = joinChunkNames(chunks);
          // return `${cacheGroupKey}--${allChunksNames}--${moduleFileName}`;
          // return `${cacheGroupKey}--${allChunksNames}`;
          return allChunksNames && `vendors-${allChunksNames}`;
        },
      },
    },
  },
});

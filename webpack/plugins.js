const {
  optimize: {
    CommonsChunkPlugin,
    OccurrenceOrderPlugin,
    UglifyJsPlugin,
  },
  ProvidePlugin,
} = require('webpack')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = env => [
  // new TsConfigPathsPlugin({
  //   baseUrl: require('path').resolve(process.cwd(), ''),
  // }),
  // new CheckerPlugin(),

  // new OccurrenceOrderPlugin(),

  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: module => module.resource && module.resource.includes('node_modules'),
  }),

  new ProvidePlugin({
    Promise: 'es6-promise',
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
  }),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'template.html',
    hash: true,
    minify: {
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true,
    },
  }),

  new CopyWebpackPlugin([
    {
      from: 'data',
      to: 'data',
    },
    {
      from: '404.html',
    }
  ]),

  env !== 'dev' && new UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      dead_code: true,
      properties: true,
      unused: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
    // sourceMap: true, // retains sourcemaps for typescript
  }),

  env === 'test' && new BundleAnalyzerPlugin(),
].filter(item => item)

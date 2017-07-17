const {
  DefinePlugin,
  optimize: {
    CommonsChunkPlugin,
    OccurrenceOrderPlugin,
  },
} = require('webpack')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const IS_REACT = /node_modules.+?(react|styled)/

module.exports = env => [
  // new TsConfigPathsPlugin({
  //   baseUrl: require('path').resolve(process.cwd(), ''),
  // }),
  // new CheckerPlugin(),

  // new OccurrenceOrderPlugin(),

  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env === 'dev' ? 'development' : 'production'),
    },
  }),

  new CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js',
    minChunks: ({ resource }) => resource && resource.includes('node_modules'),
  }),

  // env !== 'dev' && new CommonsChunkPlugin({
  //   name: 'react',
  //   filename: 'react.js',
  //   minChunks: ({ resource }) => resource && IS_REACT.test(resource),
  // }),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'template.html',
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),

  new CopyWebpackPlugin([
    // {
    //   from: 'data',
    //   to: 'data',
    // },
    // {
    //   from: '404.html',
    // }
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
    mangle: {
      safari10: true,
    },
    output: {
      comments: false,
    },
    // sourceMap: true, // retains sourcemaps for typescript
  }),

  env === 'analyze' && new BundleAnalyzerPlugin(),
].filter(item => item)

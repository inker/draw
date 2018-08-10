const path = require('path')

const {
  DefinePlugin,
  HotModuleReplacementPlugin,
  optimize: {
    OccurrenceOrderPlugin,
  },
  NamedChunksPlugin,
  NamedModulesPlugin,
  HashedModuleIdsPlugin,
} = require('webpack')

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const getCurrentDate = require('./utils/getCurrentDate')
const getLastCommitHash = require('./utils/getLastCommitHash')

const SEP_RE = new RegExp(`\\${path.sep}`, 'g')
const IS_REACT = /node_modules.+?(react|styled)/
const PAGES_RE = /pages[\/\\](.+?)(index)?\.[jt]sx?/

const currentDate = getCurrentDate()
const lastCommitHash = getLastCommitHash()

const moduleToFileNames = (module) => {
  if (!module.request || !module.optional) {
    return null
  }
  const relativePath = path.relative(module.context, module.request)
  const tokens = relativePath.match(PAGES_RE)
  return tokens && tokens[1].replace(SEP_RE, '.').slice(0, -1)
}

const chunkToName = (chunk) =>
  chunk.name
  || Array.from(chunk.modulesIterable, moduleToFileNames).find((name) => name)
  || null

module.exports = env => [

  // new OccurrenceOrderPlugin(),

  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env === 'dev' ? 'development' : 'production'),
    },
    __MODIFICATION_DATE__: JSON.stringify(currentDate),
    __VERSION__: JSON.stringify(lastCommitHash),
  }),

  env === 'dev' && new HotModuleReplacementPlugin(),

  new NamedChunksPlugin(chunkToName),

  // new (env === 'dev' ? NamedModulesPlugin : HashedModuleIdsPlugin)(),

  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/template.html',
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

  // new CopyWebpackPlugin([
  //   {
  //     from: 'src/404.html',
  //   }
  // ]),

  env !== 'dev' && new UglifyJsPlugin({
    uglifyOptions: {
      compress: {
        warnings: false,
        dead_code: true,
        properties: true,
        unused: true,
        join_vars: true,
        conditionals: false, // to fix firefox
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
      },
    },
    // sourceMap: true, // retains sourcemaps for typescript
  }),

  env === 'analyze' && new BundleAnalyzerPlugin(),
].filter(item => item)

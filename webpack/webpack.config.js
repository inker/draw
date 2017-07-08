const path = require('path')
const rules = require('./rules')
const plugins = require('./plugins')

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'docs')

module.exports = ({ ENV }) => ({
  target: 'web',
  context: path.join(rootDir, 'src'),
  entry: {
    app: './index.tsx',
  },
  output: {
    path: distDir,
    filename: ENV === 'prod' ? '[name].[hash].js' : '[name].js',
    sourceMapFilename: '[file].map',
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
    alias: ENV === 'dev' ? undefined : {
      'react': path.join(rootDir, 'node_modules/react/dist/react.min.js'),
      'react-dom': path.join(rootDir, 'node_modules/react-dom/dist/react-dom.min.js')
    },
  },
  devtool: ENV === 'dev' ? 'source-map' : undefined,
  module: {
    rules: rules(ENV),
  },
  plugins: plugins(ENV),
  devServer: ENV !== 'dev' ? undefined : {
    contentBase: distDir,
    compress: true,
    port: 9080,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/404.html',
        }
      ]
    }
  },
})

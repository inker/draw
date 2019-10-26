// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

// const styledComponentsTransformer = createStyledComponentsTransformer()

const { createLodashTransformer } = require('typescript-plugin-lodash')
const { compact } = require('lodash')

const tsOptions = (env) => env === 'dev' ? {
  // getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
  useCache: true,
} : {
  getCustomTransformers: () => ({
    before: [
      createLodashTransformer(),
    ],
  }),
  ignoreDiagnostics: [],
}

module.exports = (env) => compact([
  {
    test: /worker\.[jt]s/,
    loader: 'worker-loader',
  },
  {
    test: /\.tsx?$/,
    use: {
      loader: 'awesome-typescript-loader',
      options: tsOptions(env),
    },
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[hash].[ext]',
        outputPath: 'images',
      },
    },
  },
  {
    test: /\.txt$/,
    use: 'raw-loader',
  },
])

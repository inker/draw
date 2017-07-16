const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const styledComponentsTransformer = createStyledComponentsTransformer()

const tsOptions = env => env === 'dev' ? {
  getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
} : {
  ignoreDiagnostics: [2307, 2322, 2339, 2345, 2459],
}

module.exports = env => [
  env !== 'dev' && {
    test: /\.tsx?$/,
    loader: 'lodash-ts-imports-loader',
    exclude: /node_modules/,
    enforce: 'pre',
  },
  {
    test: /\.tsx?$/,
    use: {
      loader: 'awesome-typescript-loader',
      options: tsOptions(env),
    },
    exclude: /node_modules/,
  },
  { // global
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 1,
      },
    },
  },
].filter(item => item)

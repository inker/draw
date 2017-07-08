const tsDev = 'awesome-typescript-loader'

const tsProd = {
  loader: tsDev,
  options: {
    ignoreDiagnostics: [2322, 2339, 2345, 2459, ],
  },
}

module.exports = env => [
  {
    test: /\.tsx?$/,
    use: env === 'dev' ? tsDev : tsProd,
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
    test: /\.(png|jpg|jpeg|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    },
  },
]

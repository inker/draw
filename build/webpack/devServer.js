/**
 * @type {import('@rspack/core').DevServer}
 */
module.exports = {
  port: 9080,
  compress: false,
  devMiddleware: {
    stats: 'errors-warnings',
  },
  client: {
    overlay: false,
  },
  hot: true,
  open: true,
};

import type { DevServer } from '@rspack/core';

export default {
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
} as const satisfies DevServer;

// @types/webpack-bundle-analyzer depends on webpack itself,
// which the build would otherwise not install at all.
declare module 'webpack-bundle-analyzer' {
  import type { RspackPluginInstance } from '@rspack/core';

  export class BundleAnalyzerPlugin implements RspackPluginInstance {
    apply: RspackPluginInstance['apply'];
  }
}

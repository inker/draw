import type { RuleSetRules } from '@rspack/core';

export default (isDev: boolean) =>
  (
    [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            detectSyntax: 'auto',
            jsc: {
              target: 'es2021',
              // swc doesn't read tsconfig.json,
              // so its "jsx": "react-jsx" has to be repeated here.
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        type: 'css/auto',
        parser: {
          // Left on, these rename custom properties & other names as well as classes,
          // which breaks variables shared between files
          // or set from JS (like --team-width).
          dashedIdents: false,
          customIdents: false,
          grid: false,
          container: false,
          function: false,
        },
        generator: {
          localIdentName: '[folder]__[local]__[hash:5]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: `images/[name]${isDev ? '' : '.[contenthash:8]'}[ext]`,
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
        generator: {
          filename: `data/[name]${isDev ? '' : '.[contenthash:8]'}[ext]`,
        },
      },
    ] as const satisfies RuleSetRules
  ).filter(Boolean);

/* eslint-disable eslint-comments/no-use */
/*
eslint import/no-extraneous-dependencies: [2, {
  devDependencies: true,
  optionalDependencies: false,
  peerDependencies: false,
}]
*/

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: ['tests/**/*.test.ts'],
    globals: true,
  },
})

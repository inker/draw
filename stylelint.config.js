module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  syntax: 'scss',
  rules: {
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'length-zero-no-unit': null,
    'selector-list-comma-newline-after': null,
    'block-no-empty': null,
  },
}

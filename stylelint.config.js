module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  syntax: 'scss',
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'declaration-empty-line-before': null,
    'declaration-colon-newline-after': null, // TODO: fix
    'comment-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'value-keyword-case': null, // TODO: fix
  },
}

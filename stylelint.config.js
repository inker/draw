module.exports = {
  processors: [
    'stylelint-processor-styled-components',
  ],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-styled-components',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'comment-empty-line-before': null,
    'selector-list-comma-newline-after': null,
    'no-descending-specificity': null,
    'alpha-value-notation': null,
    'string-quotes': null, // TODO: remove
    'declaration-block-no-redundant-longhand-properties': null, // TODO: remove
    'keyframes-name-pattern': null,
    'scss/at-rule-no-unknown': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'declaration-block-no-duplicate-properties': true,
    // 'value-keyword-case': [
    //   'lower',
    //   {
    //     camelCaseSvgKeywords: true,
    //   },
    // ],
    'value-keyword-case': null, // TODO: remove
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: [
          'appearance',
        ],
      },
    ],
    'value-no-vendor-prefix': [
      true,
    ],
    'at-rule-no-vendor-prefix': [
      true,
    ],
    indentation: [
      2,
      {
        baseIndentLevel: 0,
      },
    ],
    'order/properties-order': [
      [
        'all',
        'content',
        {
          groupName: 'Position',
          properties: [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
          ],
        },
        'display',
        'vertical-align',
        {
          groupName: 'Flexbox',
          order: 'flexible',
          properties: [
            'flex',
            'flex-grow',
            'flex-shrink',
            'flex-basis',
            'flex-direction',
            'flex-flow',
            'flex-wrap',
            'gap',
            'row-gap',
            'column-gap',
            'align-content',
            'align-items',
            'align-self',
            'justify-content',
            'justify-items',
            'justify-self',
          ],
        },
        {
          groupName: 'Grid',
          properties: [
            'grid',
            'grid-area',
            'grid-template',
            'grid-template-areas',
            'grid-template-rows',
            'grid-template-columns',
            'grid-row',
            'grid-row-start',
            'grid-row-end',
            'grid-column',
            'grid-column-start',
            'grid-column-end',
            'grid-auto-rows',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-gap',
            'grid-row-gap',
            'grid-column-gap',
          ],
        },
        'order',
        {
          groupName: 'Float',
          properties: [
            'float',
            'clear',
          ],
        },
        {
          groupName: 'Clipping',
          properties: [
            'overflow',
            'overflow-x',
            'overflow-y',
            'overflow-scrolling',
            'overscroll-behavior',
            'overscroll-behavior-x',
            'overscroll-behavior-y',
            'overscroll-behavior-inline',
            'overscroll-behavior-block',
            'clip',
          ],
        },
        {
          groupName: 'Margin',
          properties: [
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
          ],
        },
        'box-sizing',
        {
          groupName: 'Dimensions',
          properties: [
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
          ],
        },
        {
          groupName: 'Padding',
          properties: [
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
          ],
        },
      ],
      {
        unspecified: 'bottom',
      },
    ],
  },
}

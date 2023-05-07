module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  customSyntax: 'postcss-styled-syntax',
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'comment-empty-line-before': null,
    'no-descending-specificity': null,
    'alpha-value-notation': null,
    'string-quotes': null, // TODO: remove
    'media-feature-range-notation': null,
    'declaration-block-no-redundant-longhand-properties': null, // TODO: remove
    'declaration-block-no-duplicate-properties': true,
    // 'value-keyword-case': [
    //   'lower',
    //   {
    //     camelCaseSvgKeywords: true,
    //   },
    // ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
    'value-keyword-case': [
      'lower',
      {
        camelCaseSvgKeywords: true,
      },
    ],
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

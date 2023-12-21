import { identity } from 'lodash'

import makeStoreHookPersist from 'utils/makeStoreHookPersist'

const possibleValues = ['light', 'dark', 'auto'] as const

export type Theme = (typeof possibleValues)[number]

export default makeStoreHookPersist<Theme>('store:theme', 'light', {
  parse: identity,
  serialize: identity,
  validate: v => possibleValues.includes(v),
})

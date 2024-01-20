import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import storageWithThemeConfig from './utils/syncStorageWithThemeConfig'

const possibleValues = ['light', 'dark', 'auto'] as const

export type Theme = (typeof possibleValues)[number]

const themeAtom = atomWithStorage<Theme>(
  'store:theme',
  'light',
  storageWithThemeConfig({
    validate: value =>
      value !== null && possibleValues.includes(value as Theme),
  }),
)

export default () => useAtom<Theme>(themeAtom)

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const possibleValues = ['light', 'dark', 'auto'] as const

export type Theme = (typeof possibleValues)[number]

const themeAtom = atomWithStorage<Theme>('store:theme', 'light', {
  getItem: (key, initialValue) => {
    const val = localStorage.getItem(key) as Theme | null
    return val && possibleValues.includes(val) ? val : initialValue
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value)
  },
  removeItem: key => {
    localStorage.removeItem(key)
  },
  subscribe: (key, callback, initialValue) => {
    window.addEventListener('storage', e => {
      if (e.storageArea === localStorage && e.key === key) {
        const newValue = e.newValue as Theme | null
        if (newValue !== null && possibleValues.includes(newValue as Theme)) {
          return callback(newValue)
        }
        if (newValue !== null) {
          localStorage.removeItem(key)
        }
        callback(initialValue)
      }
    })
    return () => {}
  },
})

export default () => useAtom<Theme>(themeAtom)

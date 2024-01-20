import { atom, useAtom } from 'jotai'

const fastDrawAtom = atom(false)

export default () => useAtom(fastDrawAtom)

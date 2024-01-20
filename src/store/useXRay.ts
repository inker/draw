import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const xrayAtom = atomWithStorage('store:xray', false)

export default () => useAtom(xrayAtom)

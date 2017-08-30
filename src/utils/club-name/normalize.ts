import {
  deburr,
  memoize,
} from 'lodash'

const I_RE = /y|(ij)/g
const KH_RE = /kh/g
const ZH_RE = /zh/g
const CZ = /red star/ig

const normalize = (s: string) => deburr(s)
  .toLowerCase()
  .replace(I_RE, 'i')
  .replace(KH_RE, 'k')
  .replace(ZH_RE, 'j')
  .replace(CZ, 'crvena zvezda')

export default memoize(normalize)

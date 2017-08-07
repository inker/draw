import { isObjectLike, xor } from 'lodash'

export default (a: any, b: any) => {
  if (!isObjectLike(a) || !isObjectLike(b)) {
    return false
  }
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  return aKeys.length === bKeys.length
    && xor(aKeys, bKeys).length === 0
    && aKeys.every(key => a[key] === b[key])
}

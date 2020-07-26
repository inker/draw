import { minBy } from 'lodash'

export default <T>(arrays: readonly (readonly T[])[]) => {
  const minArr = minBy(arrays, arr => arr.length)
  return minArr ? minArr.length : Infinity
}

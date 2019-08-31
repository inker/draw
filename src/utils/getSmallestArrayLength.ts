import { minBy } from 'lodash'

export default <T>(arrays: any[][]) => {
  const minArr = minBy(arrays, arr => arr.length)
  return minArr ? minArr.length : Infinity
}

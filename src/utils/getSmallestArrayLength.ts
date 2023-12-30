import { minBy } from 'lodash'

export default (arrays: readonly (readonly any[])[]) =>
  minBy(arrays, i => i.length)?.length ?? Number.MAX_SAFE_INTEGER

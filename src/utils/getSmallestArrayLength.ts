export default <T>(arrays: readonly (readonly T[])[]) =>
  arrays.reduce((a, i) => Math.min(i.length, a), Infinity)

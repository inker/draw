export default (arrays: readonly (readonly any[])[]) =>
  arrays.reduce((a, i) => Math.min(i.length, a), Number.MAX_SAFE_INTEGER)

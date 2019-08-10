export default <T>(array: T[], index: number) => {
  const mid = array.length >> 1
  const start = index < mid ? 0 : mid
  return array.slice(start, start + mid)
}

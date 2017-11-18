export default <T>(arr: T[], threshold: number, predicate: (item: T) => boolean) => {
  let n = 0
  for (const item of arr) {
    if (predicate(item) && ++n > threshold) {
      return true
    }
  }
  return false
}

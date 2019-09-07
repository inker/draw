export default <T>(arr: readonly T[]) => {
  let i = 0
  return () => {
    const item = arr[i]
    i = (i + 1) % arr.length
    return item
  }
}

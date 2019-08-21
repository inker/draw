export default <T>(arr: T[]) => {
  let i = 0
  return () => arr[i++]
}

export default () => {
  const currentDate = new Date()
  return currentDate.toUTCString()
}

module.exports = () => {
  const currentDate = new Date()
  return currentDate.toUTCString()
}

export default (url: string, encoding: string) => {
  const searchParams = new URLSearchParams()
  searchParams.set('url', url)
  if (encoding) {
    searchParams.set('encoding', encoding)
  }
  return searchParams.toString()
}

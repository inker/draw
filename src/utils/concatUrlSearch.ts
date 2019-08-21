export default (url: string, search: string | URLSearchParams) => {
  const wrappedUrl = new URL(url)
  wrappedUrl.search = search.toString()
  return wrappedUrl.toString()
}

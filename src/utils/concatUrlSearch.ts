export default (url: string, search: string) => {
  const wrappedUrl = new URL(url)
  wrappedUrl.search = search
  return wrappedUrl.toString()
}

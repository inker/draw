/**
 * like fetch, but throwing the response is not ok
 * @return Promise with text response
 */
export default async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${url}: ${response.status} ${response.statusText}`)
  }
  return response.text()
}

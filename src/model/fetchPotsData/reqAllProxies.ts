import proxify, { NUM_PROXIES } from 'utils/proxify'
import makeRequest from 'utils/makeRequest'

export default async (url: string, encoding: string) => {
  const search = new URLSearchParams({
    url,
    encoding,
  })

  for (let i = 0; i < NUM_PROXIES; ++i) {
    const newUrl = proxify(search)
    try {
      return await makeRequest(newUrl)
    } catch (err) {
      console.error(err)
    }
  }

  throw new Error(`could not load url ${url}`)
}

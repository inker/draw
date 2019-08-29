import timelimit from 'timelimit'

import proxify, { NUM_PROXIES } from 'utils/proxify'
import makeRequest from 'utils/makeRequest'

const TIMEOUT = 10000

const requestWithTimelimit = (url: string) =>
  timelimit(makeRequest(url), TIMEOUT)

export default async (url: string, encoding: string) => {
  const search = new URLSearchParams({
    url,
    encoding,
  })

  for (let i = 0; i < NUM_PROXIES; ++i) {
    const newUrl = proxify(search)
    try {
      return await requestWithTimelimit(newUrl)
    } catch (err) {
      console.error(err)
    }
  }

  throw new Error(`could not load url ${url}`)
}

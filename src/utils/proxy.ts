import delay from 'delay.js'
import { shuffle } from 'lodash'

const proxies = shuffle([
  'heather-guardian',
  'button-match',
  'conscious-cheek',
  'alder-wax',
  'trapezoidal-scorpion',
])

export default async (url: string, encoding: string) => {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(250)
  }
  const searchParams = new URLSearchParams()
  searchParams.set('url', url)
  if (encoding) {
    searchParams.set('encoding', encoding)
  }
  for (const proxy of proxies) {
    const wrappedUrl = new URL(`https://${proxy}.glitch.me`)
    wrappedUrl.search = searchParams.toString()
    try {
      const response = await fetch(wrappedUrl.toString())
      if (response.status !== 200) {
        throw new Error(`${url}: ${response.status}`)
      }
      return response.text()
    } catch (err) {
      console.error(err)
    }
  }
  throw new Error(`could not load url ${url}`)
}

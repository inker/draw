import delay from 'delay.js'
import { shuffle } from 'lodash'

const proxies = shuffle([
  'heather-guardian',
  'button-match',
  'conscious-cheek',
])

export default async (url: string, encoding: string) => {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(1000)
  }
  const query = `?url=${encodeURIComponent(url)}${encoding ? `&encoding=${encoding}` : ''}`
  for (const proxy of proxies) {
    const host = `https://${proxy}.glitch.me`
    try {
      const response = await fetch(`${host}/${query}`)
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

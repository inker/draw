import delay from 'delay.js'

export default async (interval: number) => {
  while (!navigator.onLine) {
    console.error("you're offline, retrying...")
    await delay(interval)
  }
}

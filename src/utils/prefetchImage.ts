import { memoize } from 'lodash'

function prefetchImage(url: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.onerror = console.error
  return new Promise<void>(resolve => {
    link.onload = resolve as any
    link.href = url
    document.head.appendChild(link)
  })
}

export default memoize(prefetchImage)

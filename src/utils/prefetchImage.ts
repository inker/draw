import { memoize } from 'lodash'

export default memoize((url: string) => {
  const img = document.createElement('img')
  return new Promise<void>(resolve => {
    img.onload = resolve as any
    img.src = url
  })
})

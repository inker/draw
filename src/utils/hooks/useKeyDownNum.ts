import useGlobalEvent from './useGlobalEvent'

export default (callback: (n: number) => void) =>
  useGlobalEvent('keydown', e => {
    const n = +e.key
    if (Number.isNaN(n)) {
      return
    }
    callback(n)
  })

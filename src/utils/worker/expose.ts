export default <F extends (arg: any) => any>(func: F) => {
  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (e: MessageEvent) => {
    const {
      correlationId,
      data,
    } = e.data

    const result = func(data)

    postMessage({
      correlationId,
      data: result,
    })
  })
}

export type ExposedFuncType<F extends (...args: readonly any[]) => any> =
  (...args: Parameters<F>) => Promise<ReturnType<F>>

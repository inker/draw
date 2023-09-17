export default <F extends (arg: any) => any>(func: F) => {
  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (e: MessageEvent) => {
    const {
      messageId,
      data,
    } = e.data

    const result = func(data)

    postMessage({
      messageId,
      data: result,
    })
  })
}

export type ExposedFuncType<F extends (...args: readonly any[]) => any> =
  (...args: Parameters<F>) => Promise<ReturnType<F>>

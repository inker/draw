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

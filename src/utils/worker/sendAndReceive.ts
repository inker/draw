export default <Request, Response>(worker: Worker) => {
  interface ReceivedMessage {
    correlationId: string
    data: Response
  }

  type Callback = (response: Response) => void
  const callbacks = new Map<string, Callback>()

  worker.addEventListener('message', (e: MessageEvent<ReceivedMessage>) => {
    const id = e.data.correlationId
    const cb = callbacks.get(e.data.correlationId)
    if (!cb) {
      return
    }

    callbacks.delete(id)
    cb(e.data.data)
  })

  return (message: Request) =>
    new Promise<Response>(resolve => {
      const id = global.crypto.randomUUID()
      callbacks.set(id, resolve)
      worker.postMessage({
        correlationId: id,
        data: message,
      })
    })
}

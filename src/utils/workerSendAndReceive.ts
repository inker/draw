import getRandomId from 'utils/getRandomId'

export default <Request, Response>(worker: Worker) => {
  interface ReceivedMessage {
    messageId: string,
    data: Response,
  }

  type Callback = (response: Response) => void
  const callbacks = new Map<string, Callback>()

  worker.addEventListener('message', (e: MessageEvent<ReceivedMessage>) => {
    const id = e.data.messageId
    const cb = callbacks.get(e.data.messageId)
    if (!cb) {
      return
    }

    callbacks.delete(id)
    cb(e.data.data)
  })

  return (message: Request) => new Promise<Response>(resolve => {
    const id = getRandomId()
    callbacks.set(id, resolve)
    worker.postMessage({
      messageId: id,
      data: message,
    })
  })
}

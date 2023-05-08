import getRandomId from 'utils/getRandomId'

export default <Request, Response>(worker: Worker) => (message: Request) =>
  new Promise<Response>((resolve, reject) => {
    interface ReceivedMessage {
      messageId: string,
      data: Response,
    }

    const id = getRandomId()

    const handler = (event: MessageEvent<ReceivedMessage>) => {
      if (event.data.messageId !== id) {
        return
      }

      worker.removeEventListener('message', handler)
      resolve(event.data.data)
    }

    worker.addEventListener('message', handler)

    worker.addEventListener('error', reject)

    worker.postMessage({
      messageId: id,
      data: message,
    })
  })

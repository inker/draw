import getRandomId from 'utils/getRandomId'

type Resolver<T> = (value?: T | PromiseLike<T> | undefined) => void

class WorkerWrapper {
  private worker: Worker
  private resolvers = new Map<string, Resolver<any>>()

  constructor(worker) {
    this.worker = worker
    this.worker.onmessage = this.onMessage
  }

  private onMessage = (e: MessageEvent) => {
    const {
      messageId,
      data,
    } = e.data

    const resolver = this.resolvers.get(messageId)
    if (!resolver) {
      throw new Error(`no resolver with id = ${messageId}`)
    }

    resolver(data)
  }

  sendAndReceive(msg) {
    const messageId = getRandomId()

    const promise = new Promise<any>(resolve => {
      this.resolvers.set(messageId, resolve)
    })

    this.worker.postMessage({
      messageId,
      data: msg,
    })

    return promise
  }

  terminate() {
    this.worker.terminate()
  }
}

export default WorkerWrapper

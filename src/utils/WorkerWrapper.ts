import timelimit from 'timelimit'

import SimplifiedResolvers from './SimplifiedResolvers'

class WorkerWrapper {
  private worker: Worker
  private resolvers = new SimplifiedResolvers<any>()
  private timeout?: number

  constructor(worker, timeout?: number) {
    this.worker = worker
    this.worker.onmessage = this.onMessage
    this.timeout = timeout
  }

  private onMessage = (e: MessageEvent) => {
    const {
      messageId,
      data,
    } = e.data

    this.resolvers.resolve(messageId, data)
  }

  sendAndReceive(msg) {
    const promise = this.resolvers.getPromise(id => {
      this.worker.postMessage({
        messageId: id,
        data: msg,
      })
    })

    return this.timeout === undefined
      ? promise
      : timelimit(promise, this.timeout)
  }

  terminate() {
    this.worker.terminate()
  }
}

export default WorkerWrapper

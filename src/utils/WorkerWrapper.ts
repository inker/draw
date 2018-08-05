import AsyncManager from 'async-manager-promise'
import timelimit from 'timelimit'

class WorkerWrapper {
  private worker: Worker
  private asyncManager = new AsyncManager<any, string>()
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

    this.asyncManager.resolve(messageId, data)
  }

  sendAndReceive(msg) {
    const promise = this.asyncManager.getPromiseWithId(id => {
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

import AsyncManager from 'async-manager-promise'
import timelimit from 'timelimit'

class WorkerWrapper<Request, Response> {
  private readonly worker: Worker
  private readonly asyncManager = new AsyncManager<Response, string>()
  private readonly timeout?: number

  constructor(worker: Worker, timeout?: number) {
    this.timeout = timeout
    this.worker = worker
    this.worker.onmessage = (e) => {
      const {
        messageId,
        data,
      } = e.data

      this.asyncManager.resolve(messageId, data)
    }
  }

  sendAndReceive(msg: Request) {
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

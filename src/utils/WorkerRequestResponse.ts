import AsyncManager from 'async-manager-promise'

class WorkerWrapper<Request, Response> {
  readonly #worker: Worker
  readonly #asyncManager = new AsyncManager<Response, string>()

  constructor(worker: Worker) {
    this.#worker = worker
    this.#worker.onmessage = (e) => {
      const {
        messageId,
        data,
      } = e.data

      this.#asyncManager.resolve(messageId, data)
    }
  }

  sendAndReceive(msg: Request) {
    return this.#asyncManager.getPromiseWithId(id => {
      this.#worker.postMessage({
        messageId: id,
        data: msg,
      })
    })
  }

  terminate() {
    this.#worker.terminate()
  }
}

export default WorkerWrapper

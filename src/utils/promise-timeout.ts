type Resolve<T> = (value?: T | PromiseLike<T> | undefined) => void
type Reject = (reason?: any) => void

/**
 * instead of new Promise((resolve, reject) => { ... }),
 * use promiseWithTimeout((resolve, reject) => { ... }, timeout, errorMsg)
 */
export const promiseWithTimeout = <T>(
  cb: (resolve: Resolve<T>, reject: Reject) => void,
  timeout: number,
  errorMsg?: string,
) => new Promise<T>((resolve, reject) => {
  cb(resolve, reject)
  setTimeout(() => {
    if (errorMsg) {
      reject(new Error(errorMsg))
    } else {
      resolve()
    }
  }, timeout)
})

/**
 * adds timelimit to the given promise
 */
export const timelimit = <T>(
  promise: Promise<T>,
  timeout: number,
  errorMsg?: string,
) => promiseWithTimeout(
  (resolve, reject) => promise.then(resolve).catch(reject),
  timeout,
  errorMsg,
)

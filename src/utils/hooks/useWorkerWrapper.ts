import {
  useMemo,
  useCallback,
  useEffect,
} from 'react'

import WorkerRequestResponse from 'utils/WorkerRequestResponse'

interface ConstructibleWorker extends Worker {
  new(): this,
}

export default <Request, Response>(WorkerClass: ConstructibleWorker, timeout?: number) => {
  const workerReqResp = useMemo(
    () => new WorkerRequestResponse<Request, Response>(new WorkerClass(), timeout),
    [WorkerClass, timeout],
  )

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      workerReqResp.terminate()
    }
  }, [workerReqResp])

  return useCallback(
    workerReqResp.sendAndReceive.bind(workerReqResp),
    [workerReqResp],
  )
}

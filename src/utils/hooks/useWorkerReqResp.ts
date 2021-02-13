import {
  useMemo,
  useCallback,
  useEffect,
} from 'react'

import WorkerRequestResponse from 'utils/WorkerRequestResponse'

export default <Request, Response>(getWorker: () => Worker) => {
  const workerReqResp = useMemo(
    () => new WorkerRequestResponse<Request, Response>(getWorker()),
    [getWorker],
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

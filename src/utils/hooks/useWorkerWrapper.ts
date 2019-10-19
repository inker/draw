import WorkerWrapper from 'utils/WorkerWrapper'

import {
  useMemo,
  useCallback,
  useEffect,
} from 'react'

const TIMEOUT = 120000

export default <Request, Response>(WorkerClass) => {
  const ww = useMemo(() => new WorkerWrapper<Request, Response>(new WorkerClass(), TIMEOUT), [])

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      ww.terminate()
    }
  }, [])

  return useCallback(
    ww.sendAndReceive.bind(ww),
    [ww],
  )
}

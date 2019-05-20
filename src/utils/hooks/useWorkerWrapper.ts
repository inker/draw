import WorkerWrapper from 'utils/WorkerWrapper'

import {
  useMemo,
  useEffect,
} from 'react'

const TIMEOUT = 120000

export default (WorkerClass) => {
  const ww = useMemo(() => new WorkerWrapper(new WorkerClass(), TIMEOUT), [])

  useEffect(() => {
    return () => {
      ww.terminate()
    }
  }, [])

  return (msg: any) => ww.sendAndReceive(msg)
}

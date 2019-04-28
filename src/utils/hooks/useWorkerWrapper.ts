import WorkerWrapper from 'utils/WorkerWrapper'

import {
  useMemo,
  useEffect,
} from 'react'

const TIMEOUT = 120000

interface Msg {
  [key: string]: any,
}

export default (WorkerClass) => {
  const ww = useMemo(() => new WorkerWrapper(new WorkerClass(), TIMEOUT), [])

  useEffect(() => {
    return () => {
      ww.terminate()
    }
  }, [])

  return (msg: Msg) => ww.sendAndReceive(msg)
}

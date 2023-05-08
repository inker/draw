import {
  useMemo,
  useEffect,
} from 'react'

interface BaseWorker {
  terminate: () => void,
}

export default <T extends BaseWorker>(getWorker: () => T) => {
  const worker = useMemo(
    () => getWorker(),
    [getWorker],
  )

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      worker.terminate()
    }
  }, [worker])

  return worker
}

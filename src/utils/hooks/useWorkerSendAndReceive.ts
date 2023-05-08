import { useCallback } from 'react'

import useWorker from 'utils/hooks/useWorker'
import workerSendAndReceive from 'utils/workerSendAndReceive'

export default <Request, Response>(getWorker: () => Worker) => {
  const managedWorker = useWorker(getWorker)

  return useCallback(
    workerSendAndReceive<Request, Response>(managedWorker),
    [managedWorker],
  )
}

import { useCallback } from 'react'

import useWorker from 'utils/hooks/useWorker'
import workerSendAndReceive from 'utils/worker/sendAndReceive'

export default <Request, Response>(getWorker: () => Worker) => {
  const worker = useWorker(getWorker)

  return useCallback(workerSendAndReceive<Request, Response>(worker), [worker])
}

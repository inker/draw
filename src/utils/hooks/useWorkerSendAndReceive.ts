import { useCallback } from 'react';

import useWorker from '#utils/hooks/useWorker';
import workerSendAndReceive from '#utils/worker/sendAndReceive';

export default (getWorker: () => Worker) => {
  const worker = useWorker(getWorker);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(workerSendAndReceive<any>(worker), [worker]);
};

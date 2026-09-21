import { useCallback } from 'react';

import useWorker from '#utils/hooks/useWorker';
import workerRpc from '#utils/worker/rpc';

export default (getWorker: () => Worker) => {
  const worker = useWorker(getWorker);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(workerRpc<any>(worker), [worker]);
};

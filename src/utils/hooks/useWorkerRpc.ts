import { useCallback, useEffect, useRef } from 'react';

import workerRpc from '#utils/worker/rpc';

export default (getWorker: () => Worker) => {
  const rpcRef = useRef<ReturnType<typeof workerRpc<any>>>(null);

  // Created in the same effect that terminates it,
  // so an effect that is torn down & set up again gets a live worker
  // rather than the one it has just terminated
  useEffect(() => {
    const worker = getWorker();
    rpcRef.current = workerRpc<any>(worker);
    return () => {
      worker.terminate();
      rpcRef.current = null;
    };
  }, [getWorker]);

  return useCallback((message: unknown) => rpcRef.current!(message), []);
};

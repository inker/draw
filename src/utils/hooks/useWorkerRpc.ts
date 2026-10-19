import { useCallback, useEffect, useRef } from 'react';

import workerRpc from '#utils/worker/rpc';

export default <F extends (arg: never) => unknown>(getWorker: () => Worker) => {
  const rpcRef = useRef<ReturnType<typeof workerRpc<F>>>(null);

  // Created in the same effect that terminates it,
  // so an effect that is torn down & set up again gets a live worker
  // rather than the one it has just terminated
  useEffect(() => {
    const worker = getWorker();
    rpcRef.current = workerRpc<F>(worker);
    return () => {
      worker.terminate();
      rpcRef.current = null;
    };
  }, [getWorker]);

  return useCallback((data: Parameters<F>[0]) => rpcRef.current!(data), []);
};

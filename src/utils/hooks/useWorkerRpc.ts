import { useCallback, useEffect, useRef } from 'react';

import workerRpc from '#utils/worker/rpc';

export default <F extends (...args: never) => unknown>(
  getWorker: () => Worker,
) => {
  const rpcRef = useRef<ReturnType<typeof workerRpc<F>>>(null);

  // Created in the same effect that terminates it,
  // so an effect that is torn down & set up again gets a live worker
  // rather than the one it has just terminated
  useEffect(() => {
    const worker = getWorker();
    const rpc = workerRpc<F>(worker);
    rpcRef.current = rpc;
    return () => {
      rpc.close();
      worker.terminate();
      rpcRef.current = null;
    };
  }, [getWorker]);

  return useCallback(
    (...args: Parameters<F>) => rpcRef.current!.call(...args),
    [],
  );
};

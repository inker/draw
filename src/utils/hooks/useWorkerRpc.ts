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
    const lifetime = new AbortController();
    rpcRef.current = workerRpc<F>(getWorker(), lifetime.signal);
    return () => {
      lifetime.abort();
      rpcRef.current = null;
    };
  }, [getWorker]);

  return useCallback((...args: Parameters<F>) => rpcRef.current!(...args), []);
};

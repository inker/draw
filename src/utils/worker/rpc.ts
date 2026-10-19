import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageFromWorker,
} from './constants';

export default <F extends (arg: never) => unknown>(worker: Worker) => {
  interface Callbacks {
    resolve: (response: Awaited<ReturnType<F>>) => void;
    reject: (err: Error) => void;
  }

  const callbacks = new Map<string, Callbacks>();

  worker.addEventListener(
    'message',
    ({ data }: MessageEvent<MessageFromWorker<Awaited<ReturnType<F>>>>) => {
      const id = data[FROM_WORKER_CORRELATION_ID];
      const cb = callbacks.get(id);
      if (!cb) {
        return;
      }

      callbacks.delete(id);
      if (data.type === 'error') {
        cb.reject(data[FROM_WORKER_DATA_KEY]);
      } else {
        cb.resolve(data[FROM_WORKER_DATA_KEY]);
      }
    },
  );

  return (message: Parameters<F>[0]) =>
    new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      const id = globalThis.crypto.randomUUID();
      callbacks.set(id, {
        resolve,
        reject,
      });
      worker.postMessage({
        [FOR_WORKER_CORRELATION_ID]: id,
        [FOR_WORKER_DATA_KEY]: message,
      });
    });
};

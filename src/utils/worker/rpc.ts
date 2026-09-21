import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageFromWorker,
} from './constants';

export default <Response>(worker: Worker) => {
  interface Callbacks {
    resolve: (response: Response) => void;
    reject: (err: Error) => void;
  }

  const callbacks = new Map<string, Callbacks>();

  worker.addEventListener(
    'message',
    ({ data }: MessageEvent<MessageFromWorker<Response>>) => {
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

  return (message: unknown) =>
    new Promise<Response>((resolve, reject) => {
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

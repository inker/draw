import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageFromWorker,
} from './constants';

export default <Response>(worker: Worker) => {
  type Callback = (response: Response) => void;

  const callbacks = new Map<string, Callback>();

  worker.addEventListener(
    'message',
    (e: MessageEvent<MessageFromWorker<Response>>) => {
      const id = e.data[FROM_WORKER_CORRELATION_ID];
      const cb = callbacks.get(id);
      if (!cb) {
        return;
      }

      callbacks.delete(id);
      cb(e.data[FROM_WORKER_DATA_KEY]);
    },
  );

  return (message: unknown) =>
    new Promise<Response>(resolve => {
      const id = globalThis.crypto.randomUUID();
      callbacks.set(id, resolve);
      worker.postMessage({
        [FOR_WORKER_CORRELATION_ID]: id,
        [FOR_WORKER_DATA_KEY]: message,
      });
    });
};

import { type MessageForWorker, type MessageFromWorker } from './messages';

export default <F extends (...args: never) => unknown>(worker: Worker) => {
  interface Callbacks {
    resolve: (response: Awaited<ReturnType<F>>) => void;
    reject: (err: Error) => void;
  }

  const callbacks = new Map<string, Callbacks>();

  worker.addEventListener(
    'message',
    ({
      data,
    }: MessageEvent<MessageFromWorker<Awaited<ReturnType<F>>> | null>) => {
      if (data?.type !== 'rpc') {
        return;
      }

      const cb = callbacks.get(data.id);
      if (!cb) {
        return;
      }

      callbacks.delete(data.id);
      if (data.status === 'error') {
        cb.reject(data.error);
      } else {
        cb.resolve(data.result);
      }
    },
  );

  return (...args: Parameters<F>) =>
    new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      const id = globalThis.crypto.randomUUID();
      callbacks.set(id, {
        resolve,
        reject,
      });
      worker.postMessage({
        type: 'rpc',
        id,
        args,
      } satisfies MessageForWorker<Parameters<F>>);
    });
};

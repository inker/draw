import {
  type ConnectMessage,
  type MessageForWorker,
  type MessageFromWorker,
} from './messages';

export default <F extends (...args: never) => unknown>(worker: Worker) => {
  interface Callbacks {
    resolve: (response: Awaited<ReturnType<F>>) => void;
    reject: (err: Error) => void;
  }

  const callbacks = new Map<number, Callbacks>();
  let lastId = 0;

  const { port1, port2 } = new MessageChannel();
  worker.postMessage(
    {
      type: 'rpc-connect',
    } satisfies ConnectMessage,
    [port2],
  );

  port1.addEventListener(
    'message',
    ({ data }: MessageEvent<MessageFromWorker<Awaited<ReturnType<F>>>>) => {
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
  // A port only delivers once started,
  // which onmessage does implicitly & addEventListener does not.
  port1.start();

  return (...args: Parameters<F>) =>
    new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      const id = ++lastId;
      callbacks.set(id, {
        resolve,
        reject,
      });
      port1.postMessage({
        id,
        args,
      } satisfies MessageForWorker<Parameters<F>>);
    });
};

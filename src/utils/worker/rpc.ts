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
  let closeReason: Error | undefined;

  const { port1, port2 } = new MessageChannel();

  // detaches every listener once the connection is closed
  const listeners = new AbortController();

  /**
   * Rejects every pending call & any made afterwards.
   * Terminating the worker settles nothing on its own,
   * so whoever terminates it should close this first.
   */
  const close = (
    reason: Error = new DOMException(
      'The worker connection was closed',
      'AbortError',
    ),
  ) => {
    if (closeReason) {
      return;
    }
    closeReason = reason;
    listeners.abort();
    port1.close();
    for (const cb of callbacks.values()) {
      cb.reject(reason);
    }
    callbacks.clear();
  };

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
    {
      signal: listeners.signal,
    },
  );
  // A reply that can't be deserialised has no id to read.
  // The worker runs one call at a time & answers in order,
  // so it belongs to the oldest pending call.
  port1.addEventListener(
    'messageerror',
    () => {
      const [oldest] = callbacks;
      if (!oldest) {
        return;
      }

      const [id, cb] = oldest;
      callbacks.delete(id);
      cb.reject(new Error('The reply from the worker could not be read'));
    },
    {
      signal: listeners.signal,
    },
  );
  // The exposed function catches its own errors,
  // so this only fires for ones outside it, such as the script failing to load.
  // No call would be answered after that.
  worker.addEventListener(
    'error',
    e => {
      close(
        new Error('The worker failed', {
          cause: e,
        }),
      );
    },
    {
      signal: listeners.signal,
    },
  );
  // A port only delivers once started,
  // which onmessage does implicitly & addEventListener does not.
  port1.start();

  const call = (...args: Parameters<F>) =>
    new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      if (closeReason) {
        reject(closeReason);
        return;
      }

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

  return {
    call,
    close,
  };
};

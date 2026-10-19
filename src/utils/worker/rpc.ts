import {
  type ConnectMessage,
  type MessageForWorker,
  type MessageFromWorker,
} from './messages';

/**
 * Takes ownership of the worker.
 * Aborting the signal terminates it
 * & rejects every pending & later call with the reason.
 */
export default <F extends (...args: never) => unknown>(
  worker: Worker,
  signal: AbortSignal,
) => {
  interface Callbacks {
    resolve: (response: Awaited<ReturnType<F>>) => void;
    reject: (err: unknown) => void;
  }

  const callbacks = new Map<number, Callbacks>();
  let lastId = 0;

  // A worker that fails is as finished as one the caller has stopped
  const abortController = new AbortController();
  const lifetimeSignal = AbortSignal.any([signal, abortController.signal]);

  const { port1, port2 } = new MessageChannel();
  worker.postMessage(
    {
      type: 'rpc-connect',
    } satisfies ConnectMessage,
    [port2],
  );

  port1.addEventListener(
    'message',
    (e: MessageEvent<MessageFromWorker<Awaited<ReturnType<F>>>>) => {
      const { data } = e;
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
      signal: lifetimeSignal,
    },
  );
  // A reply that can't be deserialised arrives here with no id,
  // so the call it answers would otherwise wait forever.
  port1.addEventListener(
    'messageerror',
    () => {
      abortController.abort(
        new Error('The reply from the worker could not be read'),
      );
    },
    {
      signal: lifetimeSignal,
    },
  );
  // The exposed function catches its own errors,
  // so this only fires for ones outside it, such as the script failing to load.
  worker.addEventListener(
    'error',
    e => {
      abortController.abort(
        new Error('The worker failed', {
          cause: e,
        }),
      );
    },
    {
      signal: lifetimeSignal,
    },
  );
  // A port only delivers once started,
  // which onmessage does implicitly & addEventListener does not.
  port1.start();

  const end = () => {
    worker.terminate();
    port1.close();
    for (const cb of callbacks.values()) {
      cb.reject(lifetimeSignal.reason);
    }
    callbacks.clear();
  };
  // An already-aborted signal never fires the event
  if (lifetimeSignal.aborted) {
    end();
  } else {
    lifetimeSignal.addEventListener('abort', end, {
      once: true,
    });
  }

  return (...args: Parameters<F>) =>
    new Promise<Awaited<ReturnType<F>>>((resolve, reject) => {
      lifetimeSignal.throwIfAborted();

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

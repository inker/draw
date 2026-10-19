import {
  type ConnectMessage,
  type MessageForWorker,
  type MessageFromWorker,
} from './messages';
import type ToCloneable from './ToCloneable';

// The intersection makes a return value that can't be cloned a compile error here,
// rather than a DataCloneError in the worker.
export default <F extends (...args: any) => unknown>(
  func: F & ((...args: any) => ToCloneable<ReturnType<F>>),
) => {
  type IncomingMessage = MessageForWorker<Parameters<F>>;

  type ResponseMessage = MessageFromWorker<unknown>;

  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (we: MessageEvent<ConnectMessage | null>) => {
    const [port] = we.ports;
    if (we.data?.type !== 'rpc-connect' || !port) {
      return;
    }

    port.addEventListener('message', (e: MessageEvent<IncomingMessage>) => {
      const { id, args } = e.data;

      try {
        const result = func(...args);

        port.postMessage({
          status: 'result',
          id,
          result,
        } satisfies ResponseMessage);
      } catch (err) {
        try {
          port.postMessage({
            status: 'error',
            id,
            error: err as Error,
          } satisfies ResponseMessage);
        } catch {
          // The error itself can't be cloned (a function in its cause, say).
          // Sending one that can keeps the caller from waiting forever.
          port.postMessage({
            status: 'error',
            id,
            error: new Error(String(err)),
          } satisfies ResponseMessage);
        }
      }
    });
    port.start();
  });
};

export type ExposedFuncType<F extends (...args: never) => unknown> = (
  ...args: ToCloneable<Parameters<F>>
) => Promise<ReturnType<F>>;

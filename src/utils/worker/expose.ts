import { type MessageForWorker, type MessageFromWorker } from './messages';
import type ToCloneable from './ToCloneable';

// The intersection makes a return value that can't be cloned a compile error here,
// rather than a DataCloneError in the worker.
export default <F extends (...args: any) => unknown>(
  func: F & ((...args: any) => ToCloneable<ReturnType<F>>),
) => {
  type IncomingMessage = MessageForWorker<Parameters<F>>;

  type ResponseMessage = MessageFromWorker<unknown>;

  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (e: MessageEvent<IncomingMessage | null>) => {
    if (e.data?.type !== 'rpc') {
      return;
    }

    const { id, args } = e.data;

    try {
      const result = func(...args);

      globalThis.postMessage({
        type: 'rpc',
        status: 'result',
        id,
        result,
      } satisfies ResponseMessage);
    } catch (err) {
      globalThis.postMessage({
        type: 'rpc',
        status: 'error',
        id,
        error: err as Error,
      } satisfies ResponseMessage);
    }
  });
};

export type ExposedFuncType<F extends (...args: never) => unknown> = (
  ...args: ToCloneable<Parameters<F>>
) => Promise<ReturnType<F>>;

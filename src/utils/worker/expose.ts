import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageForWorker,
  type MessageFromWorker,
} from './constants';
import type ToCloneable from './ToCloneable';

// The intersection makes a return value that can't be cloned a compile error here,
// rather than a DataCloneError in the worker.
export default <F extends (arg: any) => unknown>(
  func: F & ((arg: any) => ToCloneable<ReturnType<F>>),
) => {
  type IncomingMessage = MessageForWorker<Parameters<typeof func>[0]>;

  type ResponseMessage = MessageFromWorker<unknown>;

  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (e: MessageEvent<IncomingMessage>) => {
    const {
      [FOR_WORKER_CORRELATION_ID]: correlationId,
      [FOR_WORKER_DATA_KEY]: data,
    } = e.data;

    try {
      const result = func(data);

      globalThis.postMessage({
        type: 'result',
        [FROM_WORKER_CORRELATION_ID]: correlationId,
        [FROM_WORKER_DATA_KEY]: result,
      } satisfies ResponseMessage);
    } catch (err) {
      globalThis.postMessage({
        type: 'error',
        [FROM_WORKER_CORRELATION_ID]: correlationId,
        [FROM_WORKER_DATA_KEY]: err as Error,
      } satisfies ResponseMessage);
    }
  });
};

export type ExposedFuncType<F extends (arg: never) => unknown> = (
  arg: ToCloneable<Parameters<F>[0]>,
) => Promise<ReturnType<F>>;

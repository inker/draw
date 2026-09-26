import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageForWorker,
  type MessageFromWorker,
} from './constants';

export default (func: (arg: any) => any) => {
  type IncomingMessage = MessageForWorker<Parameters<typeof func>[0]>;

  type ResponseMessage = MessageFromWorker<ReturnType<typeof func>>;

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

export type ExposedFuncType<F extends (...args: readonly any[]) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>;

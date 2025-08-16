import {
  FOR_WORKER_CORRELATION_ID,
  FOR_WORKER_DATA_KEY,
  FROM_WORKER_CORRELATION_ID,
  FROM_WORKER_DATA_KEY,
  type MessageForWorker,
  type MessageFromWorker,
} from './constants';

export default (func: (arg: any) => any) => {
  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', (e: MessageEvent) => {
    const {
      [FOR_WORKER_CORRELATION_ID]: correlationId,
      [FOR_WORKER_DATA_KEY]: data,
    } = e.data as MessageForWorker<Parameters<typeof func>[0]>;

    try {
      const result = func(data);

      postMessage({
        type: 'result',
        [FROM_WORKER_CORRELATION_ID]: correlationId,
        [FROM_WORKER_DATA_KEY]: result,
      } satisfies MessageFromWorker<ReturnType<typeof func>>);
    } catch (err) {
      postMessage({
        type: 'error',
        [FROM_WORKER_CORRELATION_ID]: correlationId,
        [FROM_WORKER_DATA_KEY]: err as Error,
      } satisfies MessageFromWorker<ReturnType<typeof func>>);
    }
  });
};

export type ExposedFuncType<F extends (...args: readonly any[]) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>;

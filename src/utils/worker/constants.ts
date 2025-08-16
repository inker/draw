export const FOR_WORKER_CORRELATION_ID = 'corelationId';
export const FOR_WORKER_DATA_KEY = 'data';

export interface MessageForWorker<Response> {
  [FOR_WORKER_CORRELATION_ID]: string;
  [FOR_WORKER_DATA_KEY]: Response;
}

export const FROM_WORKER_CORRELATION_ID = 'corelationId111';
export const FROM_WORKER_DATA_KEY = 'data111';

export type MessageFromWorker<Response> = {
  [FROM_WORKER_CORRELATION_ID]: string;
} & (
  | {
      type: 'result';
      [FROM_WORKER_DATA_KEY]: Response;
    }
  | {
      type: 'error';
      [FROM_WORKER_DATA_KEY]: Error;
    }
);

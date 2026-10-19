/**
 * The only message on the worker's own channel.
 * It transfers the port that every call & reply then goes through,
 * so nothing else posted to the worker can reach them.
 */
export interface ConnectMessage {
  type: 'rpc-connect';
}

export interface MessageForWorker<Args> {
  id: number;
  args: Args;
}

export type MessageFromWorker<Result> = {
  id: number;
} & (
  | {
      status: 'result';
      result: Result;
    }
  | {
      status: 'error';
      error: Error;
    }
);

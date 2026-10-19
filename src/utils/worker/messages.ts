export interface MessageForWorker<Args> {
  /**
   * Tells these messages from anything else posted on the same worker
   */
  type: 'rpc';
  id: string;
  args: Args;
}

export type MessageFromWorker<Result> = {
  type: 'rpc';
  id: string;
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

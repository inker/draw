import workerRpc from '#utils/worker/rpc';

import { type Func } from './getFirstSuitableMatch.worker';

export default ({
  worker,
  ...options
}: Parameters<Func>[0] & {
  worker: Worker;
}) => {
  const invoke = workerRpc<ReturnType<Func>>(worker);
  return invoke(options);
};

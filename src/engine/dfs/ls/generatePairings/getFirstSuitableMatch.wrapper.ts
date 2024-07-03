import workerSendAndReceive from '#utils/worker/sendAndReceive';

import { type Func } from './getFirstSuitableMatch.worker';

export default ({
  worker,
  ...options
}: Parameters<Func>[0] & {
  worker: Worker;
}) => {
  const invoke = workerSendAndReceive<Parameters<Func>[0], ReturnType<Func>>(
    worker,
  );
  return invoke(options);
};

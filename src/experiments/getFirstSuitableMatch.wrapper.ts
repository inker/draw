import workerSendAndReceive from '#utils/worker/sendAndReceive';

import { type Func } from './getFirstSuitableMatch.worker';

export default async (...args: Parameters<Func>) => {
  const worker = new Worker(
    new URL('./getFirstSuitableMatch.worker', import.meta.url),
  );
  const result = (await workerSendAndReceive(worker)(
    ...args,
  )) as ReturnType<Func>;
  worker.terminate();
  return result;
};

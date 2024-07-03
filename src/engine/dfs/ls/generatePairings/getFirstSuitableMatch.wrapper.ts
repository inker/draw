import workerSendAndReceive from '#utils/worker/sendAndReceive';

import { type Func } from './getFirstSuitableMatch.worker';

export default async ({
  signal,
  ...options
}: Parameters<Func>[0] & {
  signal?: AbortSignal;
}) => {
  const worker = new Worker(
    new URL('./getFirstSuitableMatch.worker', import.meta.url),
  );

  if (signal) {
    signal.addEventListener(
      'abort',
      () => {
        worker.terminate();
      },
      {
        once: true,
      },
    );
  }

  try {
    const invoke = workerSendAndReceive<Parameters<Func>[0], ReturnType<Func>>(
      worker,
    );
    return await invoke(options);
  } finally {
    worker.terminate();
  }
};

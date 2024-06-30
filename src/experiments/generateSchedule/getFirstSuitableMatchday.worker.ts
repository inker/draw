import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose';

import getFirstSuitableMatchday from './getFirstSuitableMatchday';

export type Func = ExposedFuncType<typeof getFirstSuitableMatchday>;

exposeWorker(getFirstSuitableMatchday);

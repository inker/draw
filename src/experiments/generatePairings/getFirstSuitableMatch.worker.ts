import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose';

import getFirstSuitableMatch from './getFirstSuitableMatch';

export type Func = ExposedFuncType<typeof getFirstSuitableMatch>;

exposeWorker(getFirstSuitableMatch);

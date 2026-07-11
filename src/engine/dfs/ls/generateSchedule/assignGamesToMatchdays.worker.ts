import exposeWorker, { type ExposedFuncType } from '#utils/worker/expose';

import assignGamesToMatchdays from './assignGamesToMatchdays';

export type Func = ExposedFuncType<typeof assignGamesToMatchdays>;

exposeWorker(assignGamesToMatchdays);

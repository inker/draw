import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { uniqueId } from 'lodash';

import useFastDraw from './useFastDraw';

const drawIdAtom = atom(uniqueId('draw-'));

export default () => {
  const [state, setState] = useAtom(drawIdAtom);
  const [, setIsFastDraw] = useFastDraw();

  const cb = useCallback(() => {
    setState(uniqueId('draw-'));
    setIsFastDraw(false);
  }, []);

  return [state, cb] as const;
};

import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import { uniqueId } from 'lodash';

const drawIdAtom = atom(uniqueId('draw-'));

export default () => {
  const [state, setState] = useAtom(drawIdAtom);
  const setDrawId = useCallback(() => {
    setState(uniqueId('draw-'));
  }, []);
  return [state, setDrawId] as const;
};

import { atom, getDefaultStore, useAtom } from 'jotai';

const fastDrawAtom = atom(false);

/**
 * For code outside React,
 * which reaches the same store since the app has no jotai Provider
 */
export const resetFastDraw = () => {
  getDefaultStore().set(fastDrawAtom, false);
};

export default () => useAtom(fastDrawAtom);

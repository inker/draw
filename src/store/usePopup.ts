import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

interface PopupState {
  error: string | null;
}

const initialState: PopupState = {
  error: null,
};

const popupAtom = atom(initialState);

export default () => {
  const [popupState, set] = useAtom(popupAtom);
  const setPartialPopupState = useCallback(
    (partialState: Partial<PopupState>) => {
      set(state => ({
        ...state,
        ...partialState,
      }));
    },
    [set],
  );
  return [popupState, setPartialPopupState] as const;
};

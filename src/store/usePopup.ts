import { useCallback } from 'react'

import makeStoreHook from 'utils/makeStoreHook'
import usePartial from 'utils/hooks/usePartial'

interface PopupState {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

const initialState: PopupState = {
  initial: true,
  waiting: true,
  error: null,
}

const useStore = makeStoreHook(initialState)

export default () => {
  const [popupState, set] = useStore()
  const setPartialPopupState = useCallback(usePartial(set), [set])
  return [popupState, setPartialPopupState] as const
}

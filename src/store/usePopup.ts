import { useCallback } from 'react'

import makeStoreHook from 'utils/makeStoreHook'

interface PopupState {
  initial: boolean
  waiting: boolean
  error: string | null
}

const initialState: PopupState = {
  initial: true,
  waiting: true,
  error: null,
}

const useStore = makeStoreHook(initialState)

export default () => {
  const [popupState, set] = useStore()
  const setPartialPopupState = useCallback(
    (partialState: Partial<PopupState>) => {
      set(state => ({
        ...state,
        ...partialState,
      }))
    },
    [set],
  )
  return [popupState, setPartialPopupState] as const
}

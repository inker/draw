import { useCallback } from 'react'
import { atom, useAtom } from 'jotai'

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

const popupAtom = atom(initialState)

export default () => {
  const [popupState, set] = useAtom(popupAtom)
  const setPartialPopupState = useCallback(
    (partialState: Partial<PopupState>) => {
      set(state => ({
        ...state,
        ...partialState,
      }))
    },
    [],
  )
  return [popupState, setPartialPopupState] as const
}

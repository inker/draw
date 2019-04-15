import makeReducerHook from 'utils/makeReducerHook'

interface PopupState {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

const state: PopupState = {
  initial: true,
  waiting: true,
  error: null,
}

export default makeReducerHook(state)

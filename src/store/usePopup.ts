import makeReducerHookPartial from 'utils/makeReducerHookPartial'

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

export default makeReducerHookPartial(state)

import React, {
  useState,
  useCallback,
  memo,
  lazy,
  Suspense,
} from 'react'
import styled from 'styled-components'

import Notification from 'ui/Notification'

const mainPromise = import(/* webpackChunkName: "main" */ './Main')
const Main = lazy(() => mainPromise)

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`

interface State {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

const App = () => {
  const [state, setState] = useState<State>({
    initial: true,
    waiting: true,
    error: null,
  })

  const onError = useCallback((err: Error) => {
    const { message } = err
    setState({
      initial: false,
      waiting: false,
      error: message.startsWith('Cannot find module') ? 'Could not load site' : message,
    })
  }, [setState])

  const getWrappedPopup = useCallback((props) => (
    <Notification
      {...props}
      noAnimation={state.initial}
    />
  ), [state])

  const Popup = useCallback(() => {
    const { error, waiting } = state
    const WrappedPopup = getWrappedPopup
    if (!navigator.onLine) {
      return <WrappedPopup>you're offline</WrappedPopup>
    }
    if (error) {
      return <WrappedPopup>{error}</WrappedPopup>
    }
    if (waiting) {
      return <WrappedPopup>wait...</WrappedPopup>
    }
    return null
  }, [state])

  return (
    <Root>
      <Suspense fallback={false}>
        <Main
          // onError={this.onError}
          initial={state.initial}
          setPopup={setState}
          // getPopup={this.getPopup}
          onLoadError={onError}
        />
      </Suspense>
      <Popup />
    </Root>
  )
}

export default memo(App)

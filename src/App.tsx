import React, {
  useState,
  useCallback,
  useEffect,
  memo,
  lazy,
  Suspense,
} from 'react'
import styled from 'styled-components'

import Notification from 'ui/Notification'

const Routes = lazy(() => import(/* webpackChunkName: "routes" */ './routes'))
const Version = lazy(() => import(/* webpackChunkName: "version" */ './Version'))

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`

interface PopupState {
  waiting: boolean,
  error: string | null,
}

const App = () => {
  const [initial, setInitial] = useState(true)

  const [popupState, setPopupState] = useState<PopupState>({
    waiting: true,
    error: null,
  })

  const setPopup = useCallback((s: Partial<PopupState>) => {
    setPopupState({
      ...popupState,
      ...s,
    })
  }, [popupState])

  const onError = useCallback((err: Error) => {
    const { message } = err
    setInitial(false)
    setPopupState({
      waiting: false,
      error: message.startsWith('Cannot find module') ? 'Could not load site' : message,
    })
  }, [])

  const getWrappedPopup = useCallback((props) => (
    <Notification
      {...props}
      noAnimation={initial}
    />
  ), [initial])

  const Popup = useCallback(() => {
    const { error, waiting } = popupState
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
  }, [popupState])

  useEffect(() => {
    if (initial && !popupState.waiting) {
      setInitial(false)
    }
  }, [popupState.waiting])

  return (
    <Root>
      <Popup />
      <Suspense fallback={false}>
        <Routes
          // onError={this.onError}
          initial={initial}
          setPopup={setPopup}
          // getPopup={this.getPopup}
          onLoadError={onError}
        />
      </Suspense>
      <Suspense fallback={false}>
        <Version />
      </Suspense>
    </Root>
  )
}

export default memo(App)

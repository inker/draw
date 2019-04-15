import React, {
  useCallback,
  useEffect,
  memo,
  lazy,
  Suspense,
} from 'react'
import styled from 'styled-components'

import usePopup from 'store/usePopup'

import Popup from './Popup'

const Routes = lazy(() => import(/* webpackChunkName: "routes" */ './routes'))
const Version = lazy(() => import(/* webpackChunkName: "version" */ './Version'))

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`

const App = () => {
  const [popup, setPopup] = usePopup()

  const onError = useCallback((err: Error) => {
    const { message } = err
    setPopup({
      initial: false,
      waiting: false,
      error: message.startsWith('Cannot find module') ? 'Could not load site' : message,
    })
  }, [])

  useEffect(() => {
    if (popup.initial && !popup.waiting) {
      setPopup({
        initial: false,
      })
    }
  }, [popup.waiting])

  return (
    <Root>
      <Popup />
      <Suspense fallback={false}>
        <Routes onLoadError={onError} />
      </Suspense>
      <Suspense fallback={false}>
        <Version />
      </Suspense>
    </Root>
  )
}

export default memo(App)

import React, {
  useEffect,
  lazy,
  Suspense,
} from 'react'
import styled from 'styled-components'

import usePopup from 'store/usePopup'

import Popup from './Popup'

const routesPromise = import(/* webpackPreload: true, webpackChunkName: "routes" */ './routes')
const versionPromise = import(/* webpackPreload: true, webpackChunkName: "version" */ './Version')

const Routes = lazy(() => routesPromise)
const Version = lazy(() => versionPromise)

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;

  & * {
    box-sizing: border-box;
  }
`

const App = () => {
  const [popup, setPopup] = usePopup()

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
        <Routes />
      </Suspense>
      <Suspense fallback={false}>
        <Version />
      </Suspense>
    </Root>
  )
}

export default App

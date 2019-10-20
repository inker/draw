import React, {
  useEffect,
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

import {
  Suspense,
  lazy,
  memo,
  useEffect,
} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'
import { constant } from 'lodash'

import usePopup from 'store/usePopup'
import useIsDarkMode from 'utils/hooks/useIsDarkMode'

import * as themes from './themes'
import Body from './Body'
import Popup from './Popup'

const Routes = lazy(constant(import(/* webpackPreload: true, webpackChunkName: "routes" */ './routes')))

const Root = styled.div`
  * {
    box-sizing: border-box;
  }
`

function App() {
  const [popup, setPopup] = usePopup()
  const isDarkMode = useIsDarkMode()

  useEffect(() => {
    if (popup.initial && !popup.waiting) {
      setPopup({
        initial: false,
      })
    }
  }, [popup.waiting])

  return (
    <ThemeProvider theme={isDarkMode ? themes.dark : themes.light}>
      {/* @ts-expect-error Fix types */}
      <Body />
      <Root>
        <Popup />
        <HashRouter>
          <Suspense>
            <Routes />
          </Suspense>
        </HashRouter>
      </Root>
    </ThemeProvider>
  )
}

export default memo(App)

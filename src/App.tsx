import React, {
  PureComponent,
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

interface Props {}

interface State {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

class App extends PureComponent<Props, State> {
  state: State = {
    initial: true,
    waiting: true,
    error: null,
  }

  private onError = (err: Error) => {
    const { message } = err
    this.setState({
      initial: false,
      waiting: false,
      error: message.startsWith('Cannot find module') ? 'Could not load site' : message,
    })
  }

  private setPopup = (o: State) => {
    if (o.waiting === false) {
      o.initial = false
    }
    this.setState(o)
  }

  private getWrappedPopup = (props) => (
    <Notification
      {...props}
      noAnimation={this.state.initial}
    />
  )

  private getPopup() {
    const { error, waiting } = this.state
    const WrappedPopup = this.getWrappedPopup
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
  }

  render() {
    return (
      <Root>
        <Suspense fallback={false}>
          <Main
            // onError={this.onError}
            initial={this.state.initial}
            setPopup={this.setPopup}
            // getPopup={this.getPopup}
            onLoadError={this.onError}
          />
        </Suspense>
        {this.getPopup()}
      </Root>
    )
  }
}

export default App

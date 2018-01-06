import React, { PureComponent } from 'react'
import Import from 'react-import'
import styled from 'styled-components'

import Popup from 'components/Popup'

const Root = styled.div`
  font-family: Tahoma, Arial, sans-serif;
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

  private setPopup = (o: State) => {
    if (o.waiting === false) {
      o.initial = false
    }
    this.setState(o)
  }

  private getWrappedPopup = (props) => (
    <Popup
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
        <Import
          component={import(/* webpackChunkName: "main" */ './Main')}
          initial={this.state.initial}
          setPopup={this.setPopup}
          getPopup={this.getPopup}
        />
        {this.getPopup()}
      </Root>
    )
  }
}

export default App

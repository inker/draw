import React, { PureComponent } from 'react'
import Import from 'react-import'
import fastclick from 'fastclick'

import Popup from 'components/Popup'
import Routes from './routes'

interface Props {}

interface State {
  initial: boolean,
  waiting: boolean,
  error: string | null,
}

class Main extends PureComponent<Props, State> {
  state: State = {
    initial: true,
    waiting: true,
    error: null,
  }

  private setPopup = (o: { waiting: boolean, error: string | null }) => {
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
      <>
        <Import component={import(/* webpackChunkName: "version" */ './Version')} />
        <Routes
          initial={this.state.initial}
          setPopup={this.setPopup}
        />
        {this.getPopup()}
      </>
    )
  }
}

fastclick.attach(document.body)

export default Main

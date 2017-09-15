import * as React from 'react'

interface Props {
  load: any,
}

interface State {
  Component: (() => React.Component) | null,
}

class LazilyLoad extends React.PureComponent<Props, State> {
  state: State = {
    Component: null,
  }

  componentDidMount() {
    this.loadComponent(this.props.load)
  }

  componentWillReceiveProps(nextProps) {
    this.loadComponent(nextProps.load)
  }

  async loadComponent(load) {
    if (!load) {
      return
    }
    const module = await load()
    this.setState({
      Component: module.default,
    })
  }

  render() {
    const { load, ...props } = this.props
    const { Component } = this.state
    return !Component ? null : <Component {...props} />
  }
}

export default LazilyLoad

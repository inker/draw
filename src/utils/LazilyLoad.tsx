import * as React from 'react'

interface Props {
  component: any,
  [prop: string]: any,
}

interface State {
  Component: (() => React.Component) | null,
}

class LazilyLoad extends React.PureComponent<Props, State> {
  state: State = {
    Component: null,
  }

  componentDidMount() {
    this.loadComponent(this.props.component)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.loadComponent(nextProps.component)
  }

  async loadComponent(component) {
    if (!component) {
      return
    }
    const module = await component
    this.setState({
      Component: module.default,
    })
  }

  render() {
    const { component, ...props } = this.props
    const { Component } = this.state
    return !Component ? null : <Component {...props} />
  }
}

export default LazilyLoad

import React, { PureComponent } from 'react'
import Import from 'react-import'

import Team from 'model/team'

interface State {
  componentPromise: Promise<React.Component> | null,
}

interface Props {
  tournament: string,
  stage: string,
  pots: Team[][] | null,
}

class PageLoader extends PureComponent<Props, State> {
  state: State = {
    componentPromise: null,
  }

  componentDidMount() {
    this.loadPromise(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    if (props.tournament === nextProps.tournament && props.stage === nextProps.stage) {
      return
    }
    this.loadPromise(nextProps)
  }

  private loadPromise(props: Props) {
    const {
      tournament,
      stage,
    } = props
    this.setState({
      componentPromise: import(`pages/${tournament}/${stage}`),
    })
  }

  render() {
    const {
      tournament,
      stage,
      pots,
      ...props,
    } = this.props

    return pots && (
      <Import
        {...props}
        pots={pots}
        component={this.state.componentPromise}
      />
    )
  }
}

export default PageLoader

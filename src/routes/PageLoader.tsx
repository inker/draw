import * as React from 'react'

import { Team } from 'model/team'
import LazilyLoad from 'utils/LazilyLoad'

declare const System: any

interface State {
  componentPromise: Promise<React.Component> | null,
}

interface Props {
  tournament: string,
  stage: string,
  pots: Team[][] | null,
}

class PageLoader extends React.PureComponent<Props, State> {
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

  loadPromise(props: Props) {
    const {
      tournament,
      stage,
    } = props
    this.setState({
      componentPromise: System.import(`pages/${tournament}/${stage}`),
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
      <LazilyLoad
        {...props}
        pots={pots}
        component={this.state.componentPromise}
      />
    )
  }
}

export default PageLoader

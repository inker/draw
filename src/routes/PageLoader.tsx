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
  onLoadError: (err: Error) => void,
}

class PageLoader extends PureComponent<Props, State> {
  state: State = {
    componentPromise: null,
  }

  componentDidMount() {
    this.loadPromise()
  }

  componentDidUpdate(prevProps: Props) {
    const { props } = this
    if (props.tournament === prevProps.tournament && props.stage === prevProps.stage) {
      return
    }

    this.loadPromise()
  }

  private loadPromise() {
    const {
      tournament,
      stage,
    } = this.props

    this.setState({
      componentPromise: import(`pages/${tournament}/${stage}`),
    })
  }

  render() {
    const {
      tournament,
      stage,
      pots,
      onLoadError,
      ...props
    } = this.props

    return pots && (
      <Import
        {...props}
        pots={pots}
        component={this.state.componentPromise}
        onError={onLoadError}
      />
    )
  }
}

export default PageLoader

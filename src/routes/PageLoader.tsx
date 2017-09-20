import * as React from 'react'

import LazilyLoad from 'utils/LazilyLoad'

declare const System: any

interface State {

}

interface Props {
  tournament: string,
  stage: string,
  pots: any,
}

class PageLoader extends React.PureComponent<Props, State> {
  private load() {
    const {
      tournament,
      stage,
    } = this.props
    return System.import(`pages/${tournament}/${stage}`)
  }

  render() {
    const {
      tournament,
      stage,
      pots,
      ...props,
    } = this.props

    if (!pots) {
      this.load() // precache
      return null
    }

    return (
      <LazilyLoad
        {...props}
        pots={pots}
        component={this.load()}
      />
    )
  }
}

export default PageLoader

import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'

// @ts-ignore
const version = __VERSION__

class Version extends PureComponent {
  render() {
    return (
      <Helmet>
        <meta name="version" content={version} />
      </Helmet>
    )
  }
}

export default Version

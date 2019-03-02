import React, { memo } from 'react'
import Helmet from 'react-helmet'

// @ts-ignore
const version = __VERSION__
// @ts-ignore
const modificationDate = __MODIFICATION_DATE__

console.log('modified at:', modificationDate)

const Version = () => (
  <Helmet>
    <meta
      name="version"
      content={version}
    />
    <meta
      name="modification-date"
      content={modificationDate}
    />
  </Helmet>
)

export default memo(Version)

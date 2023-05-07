import { memo } from 'react'
import { Helmet } from 'react-helmet'

// @ts-expect-error
const version = __VERSION__
// @ts-expect-error
const modificationDate = __MODIFICATION_DATE__

function Version() {
  return (
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
}

export default memo(Version)

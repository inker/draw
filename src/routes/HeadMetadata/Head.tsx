import React, { memo } from 'react'
import { Helmet } from 'react-helmet'

import RouteProps from './RouteProps'
import data from './data'

const Head = ({
  match,
}: RouteProps) => {
  const o = data(match.params.tournament) || null
  return o && (
    <Helmet>
      <title>
        {o.title}
      </title>
      <link
        rel="icon"
        type="image/x-icon"
        href={o.favicon}
      />
      <meta
        name="theme-color"
        content={o.themeColor}
      />
      <meta
        name="description"
        content={o.description}
      />
    </Helmet>
  )
}

export default memo(Head)

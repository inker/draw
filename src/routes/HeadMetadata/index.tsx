import React, { memo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import data from './data'

const routeProps = {
  path: '/:tournament',
  sensitive: true,
}

interface Match {
  tournament: string,
}

const HeadMetaData = () => {
  const match = useRouteMatch<Match>(routeProps)
  const o = match && data(match.params.tournament) || null
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

export default memo(HeadMetaData)

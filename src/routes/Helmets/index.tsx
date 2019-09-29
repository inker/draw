import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import data from './data'
import RouteProps from './RouteProps'

function render(props: RouteProps) {
  const o = data(props.match.params.tournament) || null
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

const Helmets = () => (
  <Route
    path="/:tournament"
    render={render}
  />
)

export default Helmets

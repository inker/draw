import React, { memo } from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import {
  Helmet,
} from 'react-helmet'

const Helmets = () => {
  return (
    <Switch>
      <Route path="/cl">
        <Helmet>
          <title>
            CL draw simulator
          </title>
          <link
            rel="icon"
            href="//img.uefa.com/imgml/favicon/comp/ucl.ico"
            type="image/x-icon"
          />
          <meta
            name="theme-color"
            content="#00336a"
          />
          <meta
            name="description"
            content="Champions League draw simulator"
          />
        </Helmet>
      </Route>
      <Route path="/el">
        <Helmet>
          <title>
            EL draw simulator
          </title>
          <link
            rel="icon"
            href="//img.uefa.com/imgml/favicon/comp/uefacup.ico"
            type="image/x-icon"
          />
          <meta
            name="theme-color"
            content="#f68e00"
          />
          <meta
            name="description"
            content="Europa League draw simulator"
          />
        </Helmet>
      </Route>
      <Route path="/wc">
        <Helmet>
          <title>
            FIFA World Cup draw simulator
          </title>
          <link
            rel="icon"
            href="//www.fifa.com/imgml/favicon/favicon.ico"
            type="image/x-icon"
          />
          <meta
            name="theme-color"
            content="#326295"
          />
          <meta
            name="description"
            content="FIFA World Cup draw simulator"
          />
        </Helmet>
      </Route>
    </Switch>
  )
}

export default memo(Helmets)

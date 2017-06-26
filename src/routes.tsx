import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import GS from 'pages/cl/gs'
import Last16 from 'pages/cl/last16'

import Links from './links'

const Routes = (props) => (
  <Router>
    <div>
      <Links />
      <Switch>
        <Route path="/cl/gs">
          <GS {...props} />
        </Route>
        <Route path="/cl/last16">
          <Last16 {...props} />
        </Route>
        <Redirect from="/cl" to="/cl/gs"/>
        <Route path="/">
          <GS {...props} />
        </Route>
      </Switch>
    </div>
  </Router>
)

export default Routes

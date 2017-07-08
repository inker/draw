import * as React from 'react'
import { uniqueId } from 'lodash'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import GS from 'pages/cl/gs'
import Last16 from 'pages/cl/last16'

import Links from './links'

const path = location.host.includes('github') ? '/cl-draw' : ''

interface Props {

}

interface State {
  key: string,
}

class Routes extends React.PureComponent<Props, State> {
  state = {
    key: uniqueId(),
  }

  refresh = () => {
    this.setState({
      key: uniqueId(),
    })
  }

  render() {
    const { props } = this
    return (
      <Router>
        <div>
          <Links refresh={this.refresh} />
          <Switch>
            <Route path="/cl/gs">
              <GS {...props} />
            </Route>
            <Route path="/cl/last16">
              <Last16 {...props} />
            </Route>
            <Redirect from="/cl" to="/cl/gs"/>
            <Route path={path}>
              <GS
                {...props}
                key={this.state.key}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes

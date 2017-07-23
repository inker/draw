import * as React from 'react'
import { uniqueId } from 'lodash'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import Wait from 'components/Wait'
import currentSeason from 'utils/currentSeason'

import TopPanel from './TopPanel'
import Pages from './pages'
import history from './history'

interface Props {}

interface State {
  key: string,
  // pots: GSTeam[][] | null,
  // waiting: boolean,
  // location: typeof history.location,
}

class Routes extends React.PureComponent<Props, State> {
  state = {
    key: uniqueId(),
    season: currentSeason,
    pots: null,
    waiting: false,
    location: history.location,
  }

  refresh = () => {
    this.setState({
      key: uniqueId(),
    })
  }

  onSeasonChange = (tournament: string, stage: string, season?: number) => {
    history.push(`/${tournament}/${stage}/${season}`)
  }

  getPages = (props) => {
    const { key } = this.state
    return (
      <Pages
        {...props}
        dummyKey={key}
        onSeasonChange={this.onSeasonChange}
      />
    )
  }

  render() {
    const {
      waiting,
      location,
    } = this.state
    return (
      <Router history={history}>
        <div>
          {waiting &&
            <Wait />
          }
          <TopPanel
            location={location}
            refresh={this.refresh}
            onSeasonChange={this.onSeasonChange}
          />
          <Switch>
            <Route
              path="/:tournament/:stage/:season?"
              component={this.getPages}
            />
            <Redirect from="/cl" to="/cl/gs"/>
            <Redirect from="/" to="/cl/gs"/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes

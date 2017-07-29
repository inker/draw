import * as React from 'react'
import { uniqueId } from 'lodash'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import getCurrentSeason from 'utils/getCurrentSeason'

import TopPanel from './TopPanel'
import Pages from './pages'
import history from './history'

interface Props {}

interface State {
  key: string,
  season: number,
  location: typeof history.location,
}

class Routes extends React.PureComponent<Props, State> {
  unlisten: (() => void) | undefined

  state = {
    key: uniqueId(),
    season: getCurrentSeason(history.location),
    location: history.location,
  }

  componentWillMount() {
    this.unlisten = history.listen(this.updateLocation)
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  onSeasonChange = (tournament: string, stage: string, season?: number) => {
    history.push(`/${tournament}/${stage}${season ? `/${season}` : ''}`)
  }

  updateLocation = (location, type) => {
    const season = getCurrentSeason(location)
    this.setState({
      season,
      location: history.location,
    })
  }

  refresh = () => {
    this.setState({
      key: uniqueId(),
    })
  }

  getPages = (props) => {
    const { key, season } = this.state
    return (
      <Pages
        {...props}
        dummyKey={key}
        season={season}
        onSeasonChange={this.onSeasonChange}
      />
    )
  }

  render() {
    const {
      location,
    } = this.state
    return (
      <Router history={history}>
        <div>
          <TopPanel
            refresh={this.refresh}
            location={location}
            onSeasonChange={this.onSeasonChange}
          />
          <Switch>
            <Route
              path="/:tournament/:stage/:season?"
              component={this.getPages}
            />
            <Redirect
              from="/cl"
              to="/cl/gs"
            />
            <Redirect
              from="/"
              to="/cl/gs"
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes

import React, { PureComponent } from 'react'
import { uniqueId } from 'lodash'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import config from '../config.json'

import getCurrentSeason from 'utils/getCurrentSeason'

import Navbar from './Navbar'
import Pages from './pages'
import history from './history'

const { defaultTournament, defaultStage } = config

interface Props {}

interface State {
  key: string,
  tournament: string | null,
  stage: string | null,
  season: number,
  location: typeof history.location,
}

class Routes extends PureComponent<Props, State> {
  private unlisten: (() => void) | undefined

  state: State = {
    key: uniqueId(),
    tournament: null,
    stage: null,
    season: getCurrentSeason(history.location),
    location: history.location,
  }

  componentWillMount() {
    this.unlisten = history.listen(this.updateLocation)
    this.updateLocation(this.state.location, null)
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  private onSeasonChange = (tournament: string, stage: string, season?: number) => {
    history.push(`/${tournament}/${stage}${season ? `/${season}` : ''}`)
  }

  private updateLocation = (location, type) => {
    const season = getCurrentSeason(location)
    const [, tournament, stage] = location.pathname.split('/')
    this.setState({
      tournament,
      stage,
      season,
      location: history.location,
    })
  }

  private refresh = () => {
    this.setState({
      key: uniqueId(),
    })
  }

  private getPages = (props) => {
    const {
      key,
      tournament,
      stage,
      season,
    } = this.state
    return tournament && stage ? (
      <Pages
        {...props}
        dummyKey={key}
        tournament={tournament}
        stage={stage}
        season={season}
        onSeasonChange={this.onSeasonChange}
      />
    ) : null
  }

  render() {
    const {
      location,
    } = this.state
    return (
      <Router>
        <div>
          <Navbar
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
              from="/wc"
              to={`/wc/${defaultStage}`}
            />
            <Redirect
              from="/el"
              to={`/el/${defaultStage}`}
            />
            <Redirect
              from="/cl"
              to={`/cl/${defaultStage}`}
            />
            <Redirect
              from="/"
              to={`/${defaultTournament}`}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes

import React, { PureComponent } from 'react'

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import { uniqueId } from 'lodash'

import config from '../config.json'

import Visibility from 'ui/Visibility'

import getCurrentSeason from 'utils/getCurrentSeason'

import Navbar from './Navbar'
import Pages from './pages'
import history from './history'

const {
  defaultTournament,
  defaultStage,
} = config

function onSeasonChange(tournament: string, stage: string, season?: number) {
  history.push(`/${tournament}/${stage}${season ? `/${season}` : ''}`)
}

interface Props {
  initial: boolean,
  setPopup: (o: { waiting?: boolean, error?: string | null }) => void,
  onLoadError: (err: Error) => void,
}

interface State {
  key: string,
  tournament: string | null,
  stage: string | null,
  season: number,
  location: typeof history.location,
}

class Routes extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.unlisten = history.listen(this.updateLocation)
  }

  private unlisten: () => void

  state: State = {
    key: uniqueId(),
    tournament: null,
    stage: null,
    season: getCurrentSeason(history.location),
    location: history.location,
  }

  componentDidMount() {
    this.updateLocation(this.state.location, null)
  }

  componentWillUnmount() {
    this.unlisten()
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
        setPopup={this.props.setPopup}
        onLoadError={this.props.onLoadError}
        onSeasonChange={onSeasonChange}
      />
    ) : null
  }

  render() {
    const {
      location,
    } = this.state

    return (
      <Router>
        <>
          <Visibility visible={!this.props.initial}>
            <Navbar
              refresh={this.refresh}
              location={location}
              onSeasonChange={onSeasonChange}
            />
          </Visibility>
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
        </>
      </Router>
    )
  }
}

export default Routes

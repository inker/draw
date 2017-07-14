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

import Wait from 'components/Wait'

import { fetchPots, parseGS, parseLast16Teams } from 'utils/fetch-parse-pots'
import currentSeason from 'utils/currentSeason'
import { GSTeam } from 'utils/team'

import Links from './links'

const base = location.host.includes('github') ? '/draw' : ''

interface Props {

}

interface State {
  key: string,
  potsBySeason: { [season: number]: GSTeam[][] },
  season: number,
  waiting: boolean,
}

class Routes extends React.PureComponent<Props, State> {
  componentDidMount() {
    this.onSeasonChange(currentSeason)
  }

  state = {
    key: uniqueId(),
    potsBySeason: {},
    season: currentSeason,
    waiting: false,
  }

  refresh = () => {
    this.setState({
      key: uniqueId(),
    })
  }

  onSeasonChange = async (season: number) => {
    this.setState({
      waiting: true,
    })
    const { potsBySeason } = this.state
    const pots = potsBySeason[season] || parseGS(await fetchPots(season))
    this.setState({
      potsBySeason: {
        ...this.state.potsBySeason,
        [season]: pots,
      },
      season,
      waiting: false,
      key: uniqueId(),
    })
  }

  render() {
    const {
      key,
      season,
      potsBySeason,
      waiting,
    } = this.state
    const pots = potsBySeason[season]
    if (!pots) {
      return <Wait />
    }
    return (
      <Router>
        <div>
          {waiting &&
            <Wait />
          }
          <Links
            refresh={this.refresh}
            onSeasonChange={this.onSeasonChange}
          />
          <Switch>
            <Route path="/cl/gs">
              <GS />
            </Route>
            <Route path="/cl/last16">
              <Last16 />
            </Route>
            <Redirect from="/cl" to="/cl/gs"/>
            <Route path="/">
              <GS
                key={key}
                pots={pots}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes

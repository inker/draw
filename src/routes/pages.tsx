import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { uniqueId, memoize } from 'lodash'

import GS from 'pages/cl/gs'
import Last16 from 'pages/cl/last16'

import { fetchPots, parseGS } from 'utils/fetch-parse-pots'
import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import currentSeason from 'utils/currentSeason'
import { GSTeam } from 'utils/team'

import Wait from 'components/Wait'

interface Props {
  season: number,
  dummyKey: string,
  onSeasonChange: (tournament: string, stage: string, season: number) => void,
}

interface State {
  key: string,
  pots: GSTeam[][] | null,
  waiting: boolean,
}

class Pages extends React.PureComponent<Props, State> {
  state = {
    key: uniqueId(),
    pots: null,
    waiting: false,
  }

  unlisten: (() => void) | undefined

  componentDidMount() {
    const {
      match,
      // onSeasonChange,
    } = this.props
    const {
      // stage,
      // tournament,
      season,
    } = match.params
    // onSeasonChange(tournament, stage, +(season || currentSeason))
    this.fetchData(season ? +season : currentSeason)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    const { season, dummyKey } = nextProps
    if (props.season !== season) {
      this.fetchData(season)
    } else if (props.dummyKey !== dummyKey) {
      this.setState({
        key: dummyKey,
      })
    }
  }

  fetchData = async (season: number) => {
    this.setState({
      waiting: true,
    })
    const pots = await this.getPots(season)
    await this.prefetchImages(pots)
    this.setState({
      pots,
      waiting: false,
      key: uniqueId(),
    })
  }

  getPots = memoize(async (season: number) => {
    const data = await fetchPots(season)
    return parseGS(data)
  })

  prefetchImages(pots: GSTeam[][]) {
    const promises: Promise<void>[] = []
    for (const pot of pots) {
      promises.push(...pot.map(team => getCountryFlagUrl(team.country)).map(prefetchImage))
    }
    return Promise.all(promises)
  }

  render() {
    const {
      pots,
      waiting,
      key,
    } = this.state
    if (!pots) {
      return <Wait />
    }
    return (
      <div>
        {waiting &&
          <Wait />
        }
        <Switch>
          <Route path="/cl/gs">
            <GS
              pots={pots}
              key={key}
            />
          </Route>
          <Route path="/cl/last16">
            <Last16
              pots={pots}
              key={key}
            />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default Pages

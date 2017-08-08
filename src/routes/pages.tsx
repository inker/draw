import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import { uniqueId, memoize } from 'lodash'

import CLGS from 'pages/cl/gs'
import Last16 from 'pages/cl/last16'
import ELGS from 'pages/el/gs'

import currentSeason from 'model/currentSeason'
import { fetchPots, parseGS } from 'model/fetch-parse-pots'
import { GSTeam } from 'model/team'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import delay from 'utils/delay'

import Popup from 'components/Popup'

interface Props {
  tournament: string,
  stage: string,
  season: number,
  dummyKey: string,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  key: string,
  pots: GSTeam[][] | null,
  waiting: boolean,
  error: string | null,
  // tournament: string,
  // stage: string,
  season: number, // for error handling (so that we know the previous season)
}

class Pages extends React.PureComponent<Props, State> {
  state = {
    key: uniqueId(),
    pots: null,
    waiting: false,
    error: null,
    season: currentSeason,
  }

  componentDidMount() {
    const {
      tournament,
      stage,
      season,
    } = this.getMatchParams()
    this.fetchData(tournament, stage, season ? +season : currentSeason)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { props } = this
    const {
      tournament,
      stage,
      season,
      dummyKey,
    } = nextProps
    if (props.season !== season || props.stage !== stage || props.tournament !== tournament) {
      this.fetchData(tournament, stage, season)
    } else if (props.dummyKey !== dummyKey) {
      this.setState({
        key: dummyKey,
      })
    }
  }

  private getMatchParams() {
    const { params } = this.props.match
    return {
      ...params,
      season: params.season ? +params.season : currentSeason,
    }
  }

  private async fetchData(tournament: string, stage: string, season: number) {
    this.setState({
      waiting: true,
    })
    try {
      const pots = await this.getPots(tournament, stage, season)
      await this.prefetchImages(pots)
      this.setState({
        pots,
        waiting: false,
        error: null,
        key: uniqueId(),
        // tournament,
        // stage,
        season,
      })
    } catch (err) {
      this.onFetchError(err)
    }
  }

  private async onFetchError(err) {
    this.setState({
      waiting: false,
      error: 'Could not fetch data',
    })
    await delay(1000)
    console.error(err)
    const { tournament, stage } = this.getMatchParams()
    const { pots, season } = this.state
    const newSeason = pots && season !== currentSeason ? season : undefined
    this.props.onSeasonChange(tournament, stage, newSeason)
    this.setState({
      error: null,
    })
  }

  private getPots = memoize(async (tournament: string, stage: string, season: number) => {
    const data = await fetchPots(tournament, season)
    return parseGS(data)
  }, (tournament, stage, season) => `${tournament}-${stage}-${season}`)

  private prefetchImages(pots: GSTeam[][]) {
    const promises: Promise<void>[] = []
    for (const pot of pots) {
      const urls = pot.map(team => getCountryFlagUrl(team.country))
      promises.push(...urls.map(prefetchImage))
    }
    return Promise.all(promises)
  }

  private getPopup = (props) => (
    <Popup
      {...props}
      noAnimation={!this.state.pots}
    />
  )

  private getPopup() {
    const { error, waiting } = this.state
    const WrappedPopup = this.getPopup
    if (!navigator.onLine) {
      return <WrappedPopup>you're offline</WrappedPopup>
    }
    if (error) {
      return <WrappedPopup>{error}</WrappedPopup>
    }
    if (waiting) {
      return <WrappedPopup>wait...</WrappedPopup>
    }
    return null
  }

  render() {
    const { pots, key } = this.state
    return (
      <div>
        {this.getPopup()}
        {pots &&
          <Switch>
            <Route path="/cl/gs">
              <div>
                <Helmet>
                  <title>CL draw simulator</title>
                  <meta name="theme-color" content="#00336a" />
                  <meta name="description" content="Champions League draw simulator" />
                </Helmet>
                <CLGS
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
            <Route path="/cl/last16">
              <div>
                <Helmet>
                  <title>CL draw simulator</title>
                  <meta name="theme-color" content="#00336a" />
                  <meta name="description" content="Champions League draw simulator" />
                </Helmet>
                <Last16
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
            <Route path="/el/gs">
              <div>
                <Helmet>
                  <title>EL draw simulator</title>
                  <meta name="theme-color" content="#f68e00" />
                  <meta name="description" content="Europa League draw simulator" />
                </Helmet>
                <ELGS
                  pots={pots}
                  key={key}
                />
              </div>
            </Route>
          </Switch>
        }
      </div>
    )
  }
}

export default Pages

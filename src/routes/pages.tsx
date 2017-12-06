import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import delay from 'delay.js'
import { uniqueId, memoize } from 'lodash'

import fetchPots from 'model/fetchPotsData'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'
import parseWc from 'model/parsePotsData/wc'
import Team from 'model/team'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import currentSeasonByTournament from 'utils/currentSeasonByTournament'

import Popup from 'components/Popup'

import PageLoader from './PageLoader'

// @ts-ignore
const version = __VERSION__

interface Props {
  tournament: string,
  stage: string,
  season: number,
  dummyKey: string,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  key: string,
  pots: Team[][] | null,
  waiting: boolean,
  error: string | null,
  // tournament: string,
  // stage: string,
  season: number, // for error handling (so that we know the previous season)
}

class Pages extends PureComponent<Props, State> {
  state: State = {
    key: uniqueId(),
    pots: null,
    waiting: false,
    error: null,
    season: currentSeasonByTournament('cl', 'gs'),
  }

  componentDidMount() {
    this.update(this.props, true)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.update(nextProps, false)
  }

  private update(nextProps: Props, force: boolean) {
    const { props } = this
    const {
      tournament,
      stage,
      season,
      dummyKey,
    } = nextProps
    if (force || props.season !== season || props.stage !== stage || props.tournament !== tournament) {
      this.fetchData(tournament, stage, season)
    } else if (props.dummyKey !== dummyKey) {
      this.setState({
        key: dummyKey,
      })
    }
  }

  private getMatchParams() {
    const { params } = this.props.match
    const season = params.season ? +params.season : currentSeasonByTournament(params.tournament, params.stage)
    return {
      ...params,
      season,
    }
  }

  private async fetchData(tournament: string, stage: string, season: number) {
    this.setState({
      waiting: true,
    })
    try {
      const potsPromise = tournament === 'wc'
        ? this.getWcPots(season)
        : this.getPotsFromBert(tournament, stage, season)
      const pots = await potsPromise
      await this.prefetchImages(pots)
      await delay(0)
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
    const newSeason = pots && season !== currentSeasonByTournament(tournament, stage) ? season : undefined
    this.props.onSeasonChange(tournament, stage, newSeason)
    this.setState({
      error: null,
    })
  }

  private getWcPots = memoize(async (season: number) => {
    const file = await import(`data/wc-${season}.json`)
    return parseWc(file)
  })

  private getPotsFromBert = memoize(async (tournament: string, stage: string, season: number) => {
    const data = await fetchPots(tournament, season)
    return (stage === 'ko' ? parseKo : parseGS)(data)
  }, (tournament, stage, season) => `${tournament}-${stage}-${season}`)

  private prefetchImages(pots: Team[][]) {
    const promises: Promise<void>[] = []
    for (const pot of pots) {
      const urls = pot.map(team => getCountryFlagUrl(team.country))
      promises.push(...urls.map(prefetchImage))
    }
    return Promise.all(promises)
  }

  private getWrappedPopup = (props) => (
    <Popup
      {...props}
      noAnimation={!this.state.pots}
    />
  )

  private getPopup() {
    const { error, waiting } = this.state
    const WrappedPopup = this.getWrappedPopup
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
        <Helmet>
          <meta name="version" content={version} />
        </Helmet>
        {this.getPopup()}
        <Switch>
          <Route path="/cl">
            <div>
              <Helmet>
                <title>CL draw simulator</title>
                <link rel="icon" href="//img.uefa.com/imgml/favicon/comp/ucl.ico" type="image/x-icon" />
                <meta name="theme-color" content="#00336a" />
                <meta name="description" content="Champions League draw simulator" />
              </Helmet>
              <Switch>
                <Route path="/cl/gs">
                  <PageLoader
                    tournament="cl"
                    stage="gs"
                    pots={pots}
                    key={key}
                  />
                </Route>
                <Route path="/cl/ko">
                  <PageLoader
                    tournament="cl"
                    stage="ko"
                    pots={pots}
                    key={key}
                  />
                </Route>
              </Switch>
            </div>
          </Route>
          <Route path="/el">
            <div>
              <Helmet>
                <title>EL draw simulator</title>
                <link rel="icon" href="//img.uefa.com/imgml/favicon/comp/uefacup.ico" type="image/x-icon" />
                <meta name="theme-color" content="#f68e00" />
                <meta name="description" content="Europa League draw simulator" />
              </Helmet>
              <Switch>
                <Route path="/el/gs">
                  <PageLoader
                    tournament="el"
                    stage="gs"
                    pots={pots}
                    key={key}
                  />
                </Route>
                <Route path="/el/ko">
                  <PageLoader
                    tournament="el"
                    stage="ko"
                    pots={pots}
                    key={key}
                  />
                </Route>
              </Switch>
            </div>
          </Route>
          <Route path="/wc">
            <div>
              <Helmet>
                <title>FIFA World Cup draw simulator</title>
                <link rel="icon" href="//www.fifa.com/imgml/favicon/favicon.ico" type="image/x-icon" />
                <meta name="theme-color" content="#326295" />
                <meta name="description" content="FIFA World Cup draw simulator" />
              </Helmet>
              <Switch>
                <Route path="/wc/gs">
                  <PageLoader
                    tournament="wc"
                    stage="gs"
                    pots={pots}
                    key={key}
                  />
                </Route>
                <Redirect
                  from="/wc/*"
                  to="/wc/gs"
                />
              </Switch>
            </div>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default Pages

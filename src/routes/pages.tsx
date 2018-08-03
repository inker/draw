import React, { PureComponent } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import delay from 'delay.js'
import timelimit from 'timelimit'
import { uniqueId, memoize } from 'lodash'

import fetchPots from 'model/fetchPotsData'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'
import parseWc from 'model/parsePotsData/wc'
import Team from 'model/team'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import currentSeasonByTournament from 'utils/currentSeasonByTournament'

import PageLoader from './PageLoader'

const getWcPots = memoize(async (season: number) => {
  const file = await import(/* webpackChunkName: "wc-data" */ `data/wc-${season}.json`)
  return parseWc(file.default) // TODO: only works with 'default' right now
})

const getPotsFromBert = memoize(async (tournament: string, stage: string, season: number) => {
  const data = await fetchPots(tournament, season)
  const parse = stage === 'ko' ? parseKo : parseGS
  return parse(data)
}, (tournament, stage, season) => `${tournament}:${stage}:${season}`)

function prefetchImages(pots: Team[][]) {
  const promises: Promise<void>[] = []
  for (const pot of pots) {
    const urls = pot.map(team => getCountryFlagUrl(team.country))
    promises.push(...urls.map(prefetchImage))
  }
  return Promise.all(promises)
}

interface Props {
  tournament: string,
  stage: string,
  season: number,
  dummyKey: string,
  setPopup: (o: { waiting?: boolean, error?: string | null }) => void,
  onLoadError: (err: Error) => void,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  key: string,
  pots: Team[][] | null,
  // tournament: string,
  // stage: string,
  season: number, // for error handling (so that we know the previous season)
}

class Pages extends PureComponent<Props, State> {
  state: State = {
    key: uniqueId(),
    pots: null,
    season: currentSeasonByTournament('cl', 'gs'),
  }

  componentDidMount() {
    this.update(this.props, true)
  }

  componentDidUpdate(prevProps: Props) {
    this.update(prevProps, false)
  }

  private update(prevProps: Props, force: boolean) {
    const {
      tournament,
      stage,
      season,
      dummyKey,
    } = this.props

    if (force || season !== prevProps.season || stage !== prevProps.stage || tournament !== prevProps.tournament) {
      this.fetchData(tournament, stage, season)
    } else if (dummyKey !== prevProps.dummyKey) {
      this.setState({
        key: dummyKey,
      })
    }
  }

  private getMatchParams() {
    // @ts-ignore
    const { params } = this.props.match
    const season = params.season ? +params.season : currentSeasonByTournament(params.tournament, params.stage)
    return {
      ...params,
      season,
    }
  }

  private async fetchData(tournament: string, stage: string, season: number) {
    this.props.setPopup({
      waiting: true,
    })

    try {
      const potsPromise = tournament === 'wc'
        ? getWcPots(2018) // TODO
        : getPotsFromBert(tournament, stage, season)

      const pots = await potsPromise

      await timelimit(prefetchImages(pots), 5000, {
        rejectOnTimeout: false,
      })

      await delay(0)
      this.setState({
        pots,
        key: uniqueId(),
        // tournament,
        // stage,
        season,
      })

      this.props.setPopup({
        waiting: false,
        error: null,
      })
    } catch (err) {
      this.onFetchError(err)
    }
  }

  private async onFetchError(err) {
    this.props.setPopup({
      waiting: false,
      error: 'Could not fetch data',
    })

    await delay(1000)
    console.error(err)
    const { tournament, stage } = this.getMatchParams()
    const { pots, season } = this.state
    const newSeason = pots && season !== currentSeasonByTournament(tournament, stage) ? season : undefined
    this.props.onSeasonChange(tournament, stage, newSeason)
    this.props.setPopup({
      error: null,
    })
  }

  render() {
    const { props } = this
    const { pots, key } = this.state

    return (
      <Switch>
        <Route path="/cl">
          <>
            <Helmet>
              <title>
                CL draw simulator
              </title>
              <link
                rel="icon"
                href="//img.uefa.com/imgml/favicon/comp/ucl.ico"
                type="image/x-icon"
              />
              <meta
                name="theme-color"
                content="#00336a"
              />
              <meta
                name="description"
                content="Champions League draw simulator"
              />
            </Helmet>
            <Switch>
              <Route path="/cl/gs">
                <PageLoader
                  tournament="cl"
                  stage="gs"
                  pots={pots}
                  key={key}
                  onLoadError={props.onLoadError}
                />
              </Route>
              <Route path="/cl/ko">
                <PageLoader
                  tournament="cl"
                  stage="ko"
                  pots={pots}
                  key={key}
                  onLoadError={props.onLoadError}
                />
              </Route>
            </Switch>
          </>
        </Route>
        <Route path="/el">
          <>
            <Helmet>
              <title>
                EL draw simulator
              </title>
              <link
                rel="icon"
                href="//img.uefa.com/imgml/favicon/comp/uefacup.ico"
                type="image/x-icon"
              />
              <meta
                name="theme-color"
                content="#f68e00"
              />
              <meta
                name="description"
                content="Europa League draw simulator"
              />
            </Helmet>
            <Switch>
              <Route path="/el/gs">
                <PageLoader
                  tournament="el"
                  stage="gs"
                  pots={pots}
                  key={key}
                  onLoadError={props.onLoadError}
                />
              </Route>
              <Route path="/el/ko">
                <PageLoader
                  tournament="el"
                  stage="ko"
                  pots={pots}
                  key={key}
                  onLoadError={props.onLoadError}
                />
              </Route>
            </Switch>
          </>
        </Route>
        <Route path="/wc">
          <>
            <Helmet>
              <title>
                FIFA World Cup draw simulator
              </title>
              <link
                rel="icon"
                href="//www.fifa.com/imgml/favicon/favicon.ico"
                type="image/x-icon"
              />
              <meta
                name="theme-color"
                content="#326295"
              />
              <meta
                name="description"
                content="FIFA World Cup draw simulator"
              />
            </Helmet>
            <Switch>
              <Route path="/wc/gs">
                <PageLoader
                  tournament="wc"
                  stage="gs"
                  pots={pots}
                  key={key}
                  onLoadError={props.onLoadError}
                />
              </Route>
              <Redirect
                from="/wc/*"
                to="/wc/gs"
              />
            </Switch>
          </>
        </Route>
      </Switch>
    )
  }
}

export default Pages

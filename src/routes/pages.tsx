import React, {
  useCallback,
  useEffect,
  memo,
} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import delay from 'delay.js'
import timelimit from 'timelimit'
import { uniqueId, memoize } from 'lodash'

import fetchPots from 'model/fetchPotsData'
import getPairings from 'model/getPairings'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'
import parseWc from 'model/parsePotsData/wc'
import Team from 'model/team'

import usePopup from 'store/usePopup'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'
import currentSeasonByTournament from 'utils/currentSeasonByTournament'

import usePartialState from 'utils/hooks/usePartialState'
import useOnUpdate from 'utils/hooks/useOnUpdate'

import PageLoader from './PageLoader'

const getWcPots = memoize(async (season: number) => {
  const file = await import(/* webpackChunkName: "wc-data" */ `data/wc-${season}.json`)
  return parseWc(file.default) // TODO: only works with 'default' right now
})

const getPotsFromBert = memoize(async (tournament: string, stage: string, season: number) => {
  const fetchPotsPromise = fetchPots(tournament, season)
  const pairings = await getPairings(season, tournament)
  const data = await fetchPotsPromise

  return stage === 'ko'
    ? parseKo(data)
    : parseGS(data, pairings)
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

const Pages = ({
  tournament,
  stage,
  season,
  dummyKey,
  // @ts-ignore
  match,
  onLoadError,
  onSeasonChange,
}: Props) => {
  const [, setPopup] = usePopup()

  const [state, setState] = usePartialState<State>({
    key: uniqueId(),
    pots: null,
    season: currentSeasonByTournament('cl', 'gs'),
  })

  const getMatchParams = useCallback(() => {
    const { params } = match
    const season = params.season
      ? +params.season
      : currentSeasonByTournament(params.tournament, params.stage)

    return {
      ...params,
      season,
    }
  }, [match])

  const onFetchError = useCallback(async (err) => {
    console.error(err)
    setPopup({
      waiting: false,
      error: 'Could not fetch data',
    })

    await delay(1000)
    const {
      tournament: newTournament,
      stage: newStage,
    } = getMatchParams()

    const newSeason = state.pots && state.season !== currentSeasonByTournament(newTournament, newStage)
      ? state.season
      : undefined
    onSeasonChange(newTournament, newStage, newSeason)
    setPopup({
      error: null,
    })
  }, [match, state, setPopup, onSeasonChange])

  const fetchData = useCallback(async () => {
    setPopup({
      waiting: true,
    })

    try {
      const potsPromise = tournament === 'wc'
        ? getWcPots(2018) // TODO
        : getPotsFromBert(tournament, stage, season)

      const newPots = await potsPromise

      await timelimit(prefetchImages(newPots), 5000, {
        rejectOnTimeout: false,
      })

      setState({
        pots: newPots,
        key: uniqueId(),
        // tournament,
        // stage,
        season,
      })

      setPopup({
        waiting: false,
        error: null,
      })
    } catch (err) {
      onFetchError(err)
    }
  }, [season, stage, tournament, setPopup])

  useEffect(() => {
    fetchData()
  }, [season, stage, tournament])

  useOnUpdate(() => {
    setState({
      key: dummyKey,
    })
  }, [dummyKey])

  const { pots, key } = state

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
                onLoadError={onLoadError}
              />
            </Route>
            <Route path="/cl/ko">
              <PageLoader
                tournament="cl"
                stage="ko"
                pots={pots}
                key={key}
                onLoadError={onLoadError}
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
                onLoadError={onLoadError}
              />
            </Route>
            <Route path="/el/ko">
              <PageLoader
                tournament="el"
                stage="ko"
                pots={pots}
                key={key}
                onLoadError={onLoadError}
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
                onLoadError={onLoadError}
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

export default memo(Pages)

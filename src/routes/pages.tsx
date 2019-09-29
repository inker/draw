import React, {
  useEffect,
  memo,
} from 'react'

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import delay from 'delay.js'
import timelimit from 'timelimit'
import {
  memoize,
} from 'lodash'

import fetchPots from 'model/fetchPotsData'
import getPairings from 'model/getPairings'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'
import parseWc from 'model/parsePotsData/wc'
import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'

import usePopup from 'store/usePopup'

import getCountryFlagUrl from 'utils/getCountryFlagUrl'
import prefetchImage from 'utils/prefetchImage'

import usePartialState from 'utils/hooks/usePartialState'
import useUpdateEffect from 'utils/hooks/useUpdateEffect'
import useUniqueId from 'utils/hooks/useUniqueId'

import PageLoader from './PageLoader'
import currentSeasonByTournament from './currentSeasonByTournament'

const getWcPots = memoize(async (season: number) => {
  const txt = await import(/* webpackChunkName: "wc-data-[request]" */ `data/wc-${season}.txt`)
  const [ths, rest] = (txt.default as string)
    .trim()
    .split('\n\n')
    .map(line => line.trim().split('\n'))
  return parseWc(ths, rest) // TODO: only works with 'default' right now
})

const getPotsFromBert = memoize(async (tournament: string, stage: string, season: number) => {
  const fetchPotsPromise = fetchPots(tournament, season)
  const pairings = await getPairings(season, tournament)
  const data = await fetchPotsPromise

  return stage === 'ko'
    ? parseKo(data)
    : parseGS(data, pairings)
}, (tournament, stage, season) => `${tournament}:${stage}:${season}`)

function prefetchImages(pots: (Club & NationalTeam)[][]) {
  const promises: Promise<void>[] = []
  for (const pot of pots) {
    const urls = pot.map(team => getCountryFlagUrl(team.country || team.name))
    promises.push(...urls.map(prefetchImage))
  }
  return Promise.all(promises)
}

interface Props {
  tournament: string,
  stage: string,
  season: number,
  dummyKey: string,
  onError: (err: Error) => void,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  pots: Club[][] | null,
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
  onError,
  onSeasonChange,
}: Props) => {
  const [, setPopup] = usePopup()
  const [key, resetKey] = useUniqueId()

  const [state, setState] = usePartialState<State>({
    pots: null,
    season: currentSeasonByTournament('cl', 'gs'),
  })

  const getMatchParams = () => {
    const { params } = match
    const season = params.season
      ? +params.season
      : currentSeasonByTournament(params.tournament, params.stage)

    return {
      ...params,
      season,
    }
  }

  const onFetchError = async (err) => {
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
  }

  const fetchData = async () => {
    setPopup({
      waiting: true,
    })

    try {
      const potsPromise = tournament === 'wc'
        ? getWcPots(2018) // TODO
        : getPotsFromBert(tournament, stage, season)

      const newPots = await potsPromise

      // @ts-ignore
      await timelimit(prefetchImages(newPots), 5000, {
        rejectOnTimeout: false,
      })

      resetKey()

      setState({
        // @ts-ignore
        pots: newPots,
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
  }

  useEffect(() => {
    fetchData()
  }, [season, stage, tournament])

  useUpdateEffect(() => {
    resetKey()
  }, [dummyKey])

  const { pots } = state

  return (
    <Switch>
      <Route path="/cl/gs">
        <PageLoader
          season={season}
          tournament="cl"
          stage="gs"
          pots={pots}
          key={key}
          onLoadError={onError}
        />
      </Route>
      <Route path="/cl/ko">
        <PageLoader
          season={season}
          tournament="cl"
          stage="ko"
          pots={pots}
          key={key}
          onLoadError={onError}
        />
      </Route>
      <Route path="/el/gs">
        <PageLoader
          season={season}
          tournament="el"
          stage="gs"
          pots={pots}
          key={key}
          onLoadError={onError}
        />
      </Route>
      <Route path="/el/ko">
        <PageLoader
          season={season}
          tournament="el"
          stage="ko"
          pots={pots}
          key={key}
          onLoadError={onError}
        />
      </Route>
      <Route path="/wc/gs">
        <PageLoader
          season={season}
          tournament="wc"
          stage="gs"
          pots={pots}
          key={key}
          onLoadError={onError}
        />
      </Route>
      <Redirect
        from="/wc/*"
        to="/wc/gs"
      />
    </Switch>
  )
}

export default memo(Pages)

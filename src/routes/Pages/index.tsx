import React, {
  useEffect,
  memo,
} from 'react'

import delay from 'delay.js'
import timelimit from 'timelimit'

import Team from 'model/team'

import usePopup from 'store/usePopup'

import usePartialState from 'utils/hooks/usePartialState'

import currentSeasonByTournament from '../currentSeasonByTournament'

import getPotsFromBert from './getPotsFromBert'
import getWcPots from './getWcPots'
import prefetchImages from './prefetchImages'
import PageLoader from './PageLoader'
import RouteProps from './RouteProps'

interface Props extends RouteProps {
  tournament: string,
  stage: string,
  season: number,
  drawId: string,
  onError: (err: Error) => void,
  onRefreshDrawId: () => void,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  pots: Team[][] | null,
  // tournament: string,
  // stage: string,
  season: number, // for error handling (so that we know the previous season)
}

const Pages = ({
  drawId,
  tournament,
  stage,
  season,
  match,
  onError,
  onRefreshDrawId,
  onSeasonChange,
}: Props) => {
  const { params } = match

  const [, setPopup] = usePopup()

  const [state, setState] = usePartialState<State>({
    pots: null,
    season: currentSeasonByTournament('cl', 'gs'),
  })

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

      onRefreshDrawId()

      setState({
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
      console.error(err)
      setPopup({
        waiting: false,
        error: 'Could not fetch data',
      })

      await delay(1000)
      const {
        tournament: newTournament,
        stage: newStage,
      } = params

      const newSeason = state.pots && state.season !== currentSeasonByTournament(newTournament, newStage)
        ? state.season
        : undefined
      onSeasonChange(newTournament, newStage, newSeason)
      setPopup({
        error: null,
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [season, stage, tournament])

  return (
    <PageLoader
      season={season}
      tournament={params.tournament}
      stage={params.stage}
      pots={state.pots}
      key={drawId}
      onLoadError={onError}
    />
  )
}

export default memo(Pages)

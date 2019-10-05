import React, {
  useState,
  useEffect,
  memo,
} from 'react'

import { useParams } from 'react-router-dom'
import delay from 'delay.js'
import timelimit from 'timelimit'

import Team from 'model/team'

import usePopup from 'store/usePopup'

import currentSeasonByTournament from '../currentSeasonByTournament'

import getPage from './getPage'
import getPotsFromBert from './getPotsFromBert'
import getWcPots from './getWcPots'
import prefetchImages from './prefetchImages'

interface Match {
  tournament: string,
  stage: string,
  season: string,
}

interface Props {
  tournament: string,
  stage: string,
  season: number,
  drawId: string,
  onError: (err: Error) => void,
  onRefreshDrawId: () => void,
  onSeasonChange: (tournament: string, stage: string, season?: number) => void,
}

interface State {
  Page: React.ComponentType<any> | null,
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
  onError,
  onRefreshDrawId,
  onSeasonChange,
}: Props) => {
  const params = useParams<Match>()
  const [, setPopup] = usePopup()

  const [state, setState] = useState<State>({
    Page: null,
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

      const newPage = await getPage(tournament, stage)

      const newPots = await potsPromise

      // @ts-ignore
      await timelimit(prefetchImages(newPots), 5000, {
        rejectOnTimeout: false,
      })

      onRefreshDrawId()

      setState({
        Page: newPage,
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

  const {
    Page,
    pots,
  } = state

  return pots && Page && (
    <Page
      key={drawId}
      tournament={params.tournament}
      stage={params.stage}
      season={season}
      pots={pots}
    />
  )
}

export default memo(Pages)

import {
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react'

import {
  Route,
  Navigate,
  Routes,
  useNavigate,
  useMatch,
} from 'react-router-dom'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useFastDraw from 'store/useFastDraw'

import Visibility from 'ui/Visibility'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import config from '../config'

import HeadMetadata from './HeadMetadata'
import Navbar from './Navbar'
import Pages from './Pages'

import currentSeasonByTournament from './currentSeasonByTournament'

interface Path {
  tournament?: Tournament,
  stage?: Stage,
}

const {
  defaultTournament,
  defaultStage,
} = config

function useSeasonTournamentStage() {
  const match = useMatch(':tournament/:stage/*')
  const params = match?.params ?? {}
  const {
    tournament,
    stage,
  } = params as Path

  const season = params
    ? +(params['*'] || currentSeasonByTournament(tournament || null, stage || null))
    : currentSeasonByTournament(defaultTournament, defaultStage)

  const o = useMemo(() => ({
    season,
    tournament,
    stage,
  }), [season, tournament, stage])

  return o
}

const Routing = () => {
  const [drawId, refreshDrawId] = useDrawId()
  const [popup] = usePopup()
  const [, setIsFastDraw] = useFastDraw()

  const o = useSeasonTournamentStage()

  useEffect(() => {
    setIsFastDraw(false)
    refreshDrawId()
  }, [o])

  const {
    tournament,
    stage,
    season,
  } = o

  const navigate = useNavigate()

  const onSeasonChange = useCallback((tm: Tournament, sg: Stage, sn?: number) => {
    navigate(`/${tm}/${sg}${sn ? `/${sn}` : ''}`)
  }, [])

  return (
    <>
      <HeadMetadata />
      <Visibility visible={!popup.initial}>
        <Navbar
          season={season}
          tournament={tournament!}
          stage={stage!}
          onSeasonChange={onSeasonChange}
        />
      </Visibility>
      {tournament && stage ? (
        <Pages
          drawId={drawId}
          tournament={tournament}
          stage={stage}
          season={season}
          onSeasonChange={onSeasonChange}
        />
      ) : null}
      <Routes>
        {/* TODO */}
        <Route path="wc/ko/:season">
          <Navigate
            to={`/wc/${defaultStage}`}
            replace
          />
        </Route>
        <Route path="wc/ko">
          <Navigate
            to={`/wc/${defaultStage}`}
            replace
          />
        </Route>
        <Route path="wc">
          <Navigate
            to={`/wc/${defaultStage}`}
            replace
          />
        </Route>
        <Route path="el">
          <Navigate
            to={`/el/${defaultStage}`}
            replace
          />
        </Route>
        <Route path="cl">
          <Navigate
            to={`/cl/${defaultStage}`}
            replace
          />
        </Route>
        <Navigate
          to={`/${defaultTournament}`}
          replace
        />
      </Routes>
    </>
  )
}

export default memo(Routing)

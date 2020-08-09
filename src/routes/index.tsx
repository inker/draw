import React, {
  useState,
  useEffect,
  memo,
} from 'react'

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useBooleanLocalStorage from 'store/useXRay'

import Visibility from 'ui/Visibility'

import Tournament from 'model/Tournament'
import Stage from 'model/Stage'

import config from '../config'

import HeadMetadata from './HeadMetadata'
import Navbar from './Navbar'
import Pages from './Pages'

import history from './history'
import currentSeasonByTournament from './currentSeasonByTournament'

type Path = [
  any,
  Tournament | null,
  Stage | null,
  number | null,
]

const {
  defaultTournament,
  defaultStage,
} = config

function onSeasonChange(tournament: Tournament, stage: Stage, season?: number) {
  history.push(`/${tournament}/${stage}${season ? `/${season}` : ''}`)
}

function getCurrentSeason(location?: typeof history.location) {
  if (!location) {
    return currentSeasonByTournament(defaultTournament, defaultStage)
  }
  const [, tournament, stage, seasonString] = location.pathname.split('/') as Path
  return +(seasonString ?? currentSeasonByTournament(tournament, stage))
}

function parseHistoryLocation(historyLocation: typeof history.location) {
  const season = getCurrentSeason(historyLocation)
  const [, tournament, stage] = historyLocation.pathname.split('/') as Path
  return {
    season,
    tournament,
    stage,
  }
}

function useSeasonTournamentStage() {
  const [historyLocation, setHistoryLocation] = useState(history.location)

  useEffect(() => {
    setHistoryLocation(historyLocation)
    const unlisten = history.listen(setHistoryLocation)
    return unlisten
  }, [])

  return parseHistoryLocation(historyLocation)
}

const Routes = () => {
  const [drawId, refreshDrawId] = useDrawId()
  const [popup] = usePopup()
  const [isXRay, setIsXRay] = useBooleanLocalStorage()

  const {
    tournament,
    stage,
    season,
  } = useSeasonTournamentStage()

  return (
    <Router>
      <>
        <HeadMetadata />
        <Visibility visible={!popup.initial}>
          <Navbar
            refresh={refreshDrawId}
            season={season}
            tournament={tournament!}
            stage={stage!}
            isXRay={isXRay}
            onSetIsXRay={setIsXRay}
            onSeasonChange={onSeasonChange}
          />
        </Visibility>
        <Switch>
          {/* TODO */}
          <Redirect
            from="/wc/ko"
            to={`/wc/${defaultStage}`}
          />
          <Route path="/:tournament/:stage/:season?">
            {tournament && stage ? (
              <Pages
                drawId={drawId}
                tournament={tournament}
                stage={stage}
                season={season}
                onRefreshDrawId={refreshDrawId}
                onSeasonChange={onSeasonChange}
              />
            ) : null}
          </Route>
          <Redirect
            from="/wc"
            to={`/wc/${defaultStage}`}
          />
          <Redirect
            from="/el"
            to={`/el/${defaultStage}`}
          />
          <Redirect
            from="/cl"
            to={`/cl/${defaultStage}`}
          />
          <Redirect
            from="/"
            to={`/${defaultTournament}`}
          />
        </Switch>
      </>
    </Router>
  )
}

export default memo(Routes)

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

import {
  defaultTournament,
  defaultStage,
} from '../config.json'

import usePopup from 'store/usePopup'
import useUniqueId from 'utils/hooks/useUniqueId'
import Visibility from 'ui/Visibility'

import HeadMetadata from './HeadMetadata'
import Navbar from './Navbar'
import Pages from './Pages'

import history from './history'
import currentSeasonByTournament from './currentSeasonByTournament'

function onSeasonChange(tournament: string, stage: string, season?: number) {
  history.push(`/${tournament}/${stage}${season ? `/${season}` : ''}`)
}

function getCurrentSeason(location?: typeof history.location) {
  if (!location) {
    return currentSeasonByTournament(defaultTournament, defaultStage)
  }
  const [, tournament, stage, seasonString] = location.pathname.split('/')
  return +(seasonString || currentSeasonByTournament(tournament, stage))
}

function parseHistoryLocation(historyLocation: typeof history.location): SeasonTournamentStage {
  const season = getCurrentSeason(historyLocation)
  const [, tournament, stage] = historyLocation.pathname.split('/')
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

interface SeasonTournamentStage {
  tournament: string | null,
  stage: string | null,
  season: number,
}

interface Props {
  onError: (err: Error) => void,
}

const Routes = ({
  onError,
}: Props) => {
  const [drawId, refreshDrawId] = useUniqueId('draw-')
  const [popup] = usePopup()

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
            <Pages
              drawId={drawId}
              tournament={tournament!}
              stage={stage!}
              season={season}
              onError={onError}
              onRefreshDrawId={refreshDrawId}
              onSeasonChange={onSeasonChange}
            />
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

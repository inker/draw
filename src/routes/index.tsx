import React, {
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react'

import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import { uniqueId } from 'lodash'

import config from '../config.json'

import Visibility from 'ui/Visibility'

import currentSeasonByTournament from 'utils/currentSeasonByTournament'

import Navbar from './Navbar'
import Pages from './pages'
import history from './history'

const {
  defaultTournament,
  defaultStage,
} = config

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

function useRefresh(): [string, () => void] {
  const [key, setKey] = useState(uniqueId())
  const refresh = useCallback(() => {
    setKey(uniqueId())
  }, [])
  return [key, refresh]
}

function useSeasonTournamentStage() {
  const [historyLocation, setHistoryLocation] = useState(history.location)

  const updateLocation = useCallback((newLocation) => {
    setHistoryLocation(newLocation)
  }, [])

  useEffect(() => {
    setHistoryLocation(historyLocation)
    const unlisten = history.listen(updateLocation)
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
  initial: boolean,
  setPopup: (o: { waiting?: boolean, error?: string | null }) => void,
  onLoadError: (err: Error) => void,
}

const Routes = ({
  initial,
  setPopup,
  onLoadError,
}: Props) => {
  const [key, refresh] = useRefresh()

  const {
    tournament,
    stage,
    season,
  } = useSeasonTournamentStage()

  return (
    <Router>
      <>
        <Visibility visible={!initial}>
          <Navbar
            refresh={refresh}
            season={season}
            tournament={tournament!}
            stage={stage!}
            onSeasonChange={onSeasonChange}
          />
        </Visibility>
        <Switch>
          <Route path="/:tournament/:stage/:season?">
            {tournament && stage ? (
              <Pages
                dummyKey={key}
                tournament={tournament}
                stage={stage}
                season={season}
                setPopup={setPopup}
                onLoadError={onLoadError}
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

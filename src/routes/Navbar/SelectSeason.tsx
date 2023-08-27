import {
  memo,
  useCallback,
} from 'react'

import {
  range,
} from 'lodash'

import type Tournament from 'model/Tournament'
import type Stage from 'model/Stage'

import Select from 'ui/SelectWithHiddenLabel'

import currentSeasonByTournament from '../currentSeasonByTournament'

import seasonAsString from './seasonAsString'

const minSeasons = {
  cl: 2000,
  el: 2009,
  ecl: 2021,
  wc: 2018,
}

interface Props {
  tournament: Tournament,
  stage: Stage,
  season: number,
  onChange: (tournament: Tournament, stage: Stage, season?: number) => void,
}

function SelectSeason({
  tournament,
  stage,
  season,
  onChange,
}: Props) {
  const onSeasonChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeason = +e.target.value
    onChange(tournament, stage, newSeason)
  }, [tournament, stage, onChange])

  const onTournamentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTournament = e.target.value as Tournament
    onChange(newTournament, stage, currentSeasonByTournament(newTournament, stage))
  }, [stage, onChange])

  const onStageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as Stage
    onChange(tournament, newStage, currentSeasonByTournament(tournament, newStage))
  }, [tournament, onChange])

  const minSeason = minSeasons[tournament]

  return (
    <div>
      <Select
        label="tournament"
        onChange={onTournamentChange}
        value={tournament}
      >
        <option value="cl">Champions League</option>
        <option value="el">Europa League</option>
        <option value="ecl">Europa Conference League</option>
        <option value="wc">World Cup</option>
      </Select>
      <Select
        label="stage"
        onChange={onStageChange}
        value={stage}
      >
        <option value="gs">Group Stage</option>
        {tournament !== 'wc' && (
          <option value="ko">Knockout Stage</option>
        )}
      </Select>
      <Select
        label="season"
        onChange={onSeasonChange}
        value={season}
      >
        {range(currentSeasonByTournament(tournament, stage), minSeason - 1, tournament === 'wc' ? -4 : -1).map(i => (
          <option
            key={i}
            value={i}
          >
            {seasonAsString(tournament, i)}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default memo(SelectSeason)

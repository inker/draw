import * as React from 'react'
import { range } from 'lodash'

import * as currentSeason from 'model/currentSeason'
import seasonAsString from 'utils/seasonAsString'

import createSelect from './createSelect'

const minSeasons = {
  cl: 2000,
  el: 2009,
  wc: 2018,
}

const SelectTournament = createSelect(175)
const SelectStage = createSelect(125)
const SelectYear = createSelect(100)

interface Props {
  tournament: string,
  stage: string,
  season: number,
  onChange: (tournament: string, stage: string, season?: number) => void,
}

class SelectSeason extends React.PureComponent<Props> {

  onTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tournament = e.target.value
    const {
      stage,
      onChange,
    } = this.props
    onChange(tournament, stage, currentSeason[tournament === 'wc' ? 'wc' : 'uefa'])
  }

  onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = e.target.value
    const {
      tournament,
      onChange,
    } = this.props
    onChange(tournament, stage, currentSeason[tournament === 'wc' ? 'wc' : 'uefa'])
  }

  onSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const season = +e.target.value
    const {
      tournament,
      stage,
      onChange,
    } = this.props
    onChange(tournament, stage, season)
  }

  render() {
    const {
      tournament,
      stage,
      season,
    } = this.props

    const minSeason = minSeasons[tournament]

    return (
      <div>
        <SelectTournament
          label="tournament"
          onChange={this.onTournamentChange}
          value={tournament}
        >
          <option value="cl">Champions League</option>
          <option value="el">Europa League</option>
          <option value="wc">World Cup</option>
        </SelectTournament>
        <SelectStage
          label="stage"
          onChange={this.onStageChange}
          value={stage}
        >
          <option value="gs">Group Stage</option>
        </SelectStage>
        <SelectYear
          label="season"
          onChange={this.onSeasonChange}
          value={season}
        >
          {range(currentSeason[tournament === 'wc' ? 'wc' : 'uefa'], minSeason - 1).map(i => (
            <option value={i}>
              {seasonAsString(tournament, i)}
            </option>
          ))}
        </SelectYear>
      </div>
    )
  }
}

export default SelectSeason

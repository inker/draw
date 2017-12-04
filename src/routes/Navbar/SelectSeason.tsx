import React, { PureComponent } from 'react'
import { range } from 'lodash'

import Select from 'components/SelectWithHiddenLabel'

import currentSeasonByTournament from 'utils/currentSeasonByTournament'
import seasonAsString from 'utils/seasonAsString'

const minSeasons = {
  cl: 2000,
  el: 2009,
  wc: 2018,
}

interface Props {
  tournament: string,
  stage: string,
  season: number,
  onChange: (tournament: string, stage: string, season?: number) => void,
}

class SelectSeason extends PureComponent<Props> {

  onTournamentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tournament = e.target.value
    const {
      stage,
      onChange,
    } = this.props
    onChange(tournament, stage, currentSeasonByTournament(tournament, stage as any))
  }

  onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = e.target.value
    const {
      tournament,
      onChange,
    } = this.props
    onChange(tournament, stage, currentSeasonByTournament(tournament, stage as any))
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
        <Select
          label="tournament"
          onChange={this.onTournamentChange}
          value={tournament}
        >
          <option value="cl">Champions League</option>
          <option value="el">Europa League</option>
          <option value="wc">World Cup</option>
        </Select>
        <Select
          label="stage"
          onChange={this.onStageChange}
          value={stage}
        >
          <option value="gs">Group Stage</option>
          {tournament !== 'wc' &&
            <option value="ko">Knockout Stage</option>
          }
        </Select>
        <Select
          label="season"
          onChange={this.onSeasonChange}
          value={season}
        >
          {range(currentSeasonByTournament(tournament, stage as any), minSeason - 1).map(i => (
            <option value={i}>
              {seasonAsString(tournament, i)}
            </option>
          ))}
        </Select>
      </div>
    )
  }
}

export default SelectSeason

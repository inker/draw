import * as React from 'react'
import { range } from 'lodash'

import currentSeason from 'model/currentSeason'
import seasonAsString from 'utils/seasonAsString'
import Select from 'components/SelectWithHiddenLabel'

const MIN_CL_SEASON = 2000
const MIN_EL_SEASON = 2009

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
    onChange(tournament, stage, currentSeason)
  }

  onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = e.target.value
    const {
      tournament,
      onChange,
    } = this.props
    onChange(tournament, stage, currentSeason)
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

    const minSeason = tournament === 'el' ? MIN_EL_SEASON : MIN_CL_SEASON
    const wcOptions = tournament === 'wc' && <option value={2018}>2018</option>

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
        </Select>
        <Select
          label="season"
          onChange={this.onSeasonChange}
          value={season}
        >
          {wcOptions || range(currentSeason, minSeason - 1).map(i => (
            <option value={i}>
              {seasonAsString(i)}
            </option>
          ))}
        </Select>
      </div>
    )
  }
}

export default SelectSeason

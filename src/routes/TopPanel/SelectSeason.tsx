import * as React from 'react'
import styled from 'styled-components'
import { range } from 'lodash'

import currentSeason from 'utils/currentSeason'
import seasonAsString from 'utils/seasonAsString'

const MIN_CL_SEASON = 2000
const MIN_EL_SEASON = 2009

const Select = styled.select`
  margin-left: 3px;
  margin-right: 3px;
`

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
    } = this.props
    this.props.onChange(tournament, stage, currentSeason)
  }

  onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = e.target.value
    const {
      tournament,
    } = this.props
    this.props.onChange(tournament, stage, currentSeason)
  }

  onSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const season = +e.target.value
    const {
      tournament,
      stage,
    } = this.props
    this.props.onChange(tournament, stage, season)
  }

  render() {
    const {
      tournament,
      stage,
      season,
    } = this.props
    return (
      <div>
        <Select
          className="needsclick"
          onChange={this.onTournamentChange}
          value={tournament}
        >
          <option value="cl">Champions League</option>
          <option value="el">Europa League</option>
        </Select>
        <Select
          className="needsclick"
          onChange={this.onStageChange}
          value={stage}
        >
          <option value="gs">Group Stage</option>
        </Select>
        <Select
          className="needsclick"
          onChange={this.onSeasonChange}
          value={season}
        >
          {range(currentSeason, (tournament === 'el' ? MIN_EL_SEASON : MIN_CL_SEASON) - 1).map(i => (
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

import * as React from 'react'
import { range } from 'lodash'

import currentSeason from 'utils/currentSeason'

const seasonAsString = (i: number) =>
  `${i}/${((i + 1) % 100).toString().padStart(2, '0')}`

interface Props {
  defaultSeason: number,
  start: number,
  onChange: (tournament: string, stage: string, season?: number) => void,
}

class SelectSeason extends React.PureComponent<Props> {

  onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [tournament, stage, season] = e.target.value.split('-')
    this.props.onChange(tournament, stage, +season)
  }

  render() {
    const {
      defaultSeason,
      start,
    } = this.props
    return (
      <select
        className="needsclick"
        onChange={this.onChange}
        value={`cl-gs-${defaultSeason}`}
      >
        {range(currentSeason, start - 1).map(i => (
          <option value={`cl-gs-${i}`}>
            {seasonAsString(i)}
          </option>
        ))}
      </select>
    )
  }
}

export default SelectSeason

import * as React from 'react'
import { range } from 'lodash'

import currentSeason from 'utils/currentSeason'

const seasonAsString = (i: number) =>
  `${i}/${((i + 1) % 100).toString().padStart(2, '0')}`

interface Props {
  defaultSeason: number,
  start: number,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

class SelectSeason extends React.PureComponent<Props> {
  render() {
    const {
      defaultSeason,
      start,
      onChange,
    } = this.props
    return (
      <select
        className="needsclick"
        onChange={onChange}
        defaultValue={`cl-gs-${defaultSeason}`}
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

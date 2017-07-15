import * as React from 'react'
import { range } from 'lodash'

import currentSeason from 'utils/currentSeason'

const seasonAsString = (i: number) =>
  `${i}/${((i + 1) % 100).toString().padStart(2, '0')}`

interface Props {
  start: number,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

class SelectSeason extends React.PureComponent<Props> {
  render() {
    const { start, onChange } = this.props
    return (
      <select
        onChange={onChange}
        defaultValue={currentSeason}
      >
        {range(start, currentSeason + 1).map(i => (
          <option value={i}>
            {seasonAsString(i)}
          </option>
        ))}
      </select>
    )
  }
}

export default SelectSeason

import * as React from 'react'
import { range } from 'lodash'

import currentSeason from 'utils/currentSeason'

interface Props {
  start: number,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

class SelectYear extends React.PureComponent<Props> {
  render() {
    const { start, onChange } = this.props
    return (
      <select
        onChange={onChange}
        defaultValue={currentSeason}
      >
        {range(start, currentSeason + 1).map(i => (
          <option
            value={i}
          >
            {i}/{((i + 1) % 100).toString().padStart(2, '0')}
          </option>
        ))}
      </select>
    )
  }
}

export default SelectYear

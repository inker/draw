import { memo } from 'react'
import { css } from 'styled-components'
import { difference } from 'lodash'

import type Team from 'model/team'

import Root from './Root'
import Pot from './Pot'

const headerStyles = css`
  background-color: rgb(0 0 0 / 0.75);
  color: #fff;
`

interface Props {
  initialPots: readonly (readonly Team[])[],
  pots: readonly (readonly Team[])[],
  selectedTeams: readonly Team[] | null,
  currentPotNum: number,
  split?: boolean,
}

function PotsContainer({
  initialPots,
  pots,
  selectedTeams,
  currentPotNum,
  split,
}: Props) {
  return (
    <Root $limitWidth={!split}>
      {initialPots.map((pot, i) => {
        const isCurrent = i === currentPotNum
        const pickedTeams = difference(initialPots[i], pots[i], selectedTeams ?? [])

        return (
          <Pot
            key={pot[0].id}
            potNum={i}
            isCurrent={isCurrent}
            teams={pot}
            pickedTeams={pickedTeams}
            selectedTeams={selectedTeams}
            numCols={split ? 2 : 1}
            headerStyles={headerStyles}
          />
        )
      })}
    </Root>
  )
}

export default memo(PotsContainer)

import React, { memo } from 'react'
import { css } from 'styled-components'
import { difference } from 'lodash'

import Team from 'model/team'

import Root from './Root'
import Pot from './Pot'

const headerStyles = css`
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
`

interface Props {
  initialPots: readonly (readonly Team[])[],
  pots: readonly (readonly Team[])[],
  selectedTeams: readonly Team[] | null,
  currentPotNum: number,
  split?: boolean,
}

const PotsContainer = ({
  initialPots,
  pots,
  selectedTeams,
  currentPotNum,
  split,
}: Props) => (
  <Root limitWidth={!split}>
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
          isSplit={split}
          headerStyles={headerStyles}
        />
      )
    })}
  </Root>
)

export default memo(PotsContainer)

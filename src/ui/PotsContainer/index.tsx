import React, { memo } from 'react'
import { difference } from 'lodash'

import Team from 'model/team'

import Root from './Root'
import BasePot from './Pot'
import SplitPot from './SplitPot'

const HEADER_BACKGROUND = 'rgba(0, 0, 0, 0.75)'
const HEADER_COLOR = '#fff'

interface Props {
  initialPots: Team[][],
  pots: Team[][],
  selectedTeams: Team[] | null,
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
    {initialPots && initialPots.map((pot, i) => {
      const Pot = split ? SplitPot : BasePot
      const isCurrent = i === currentPotNum
      const pickedTeams = difference(initialPots[i], pots[i], selectedTeams || [])

      return (
        <Pot
          key={pot[0].id}
          potNum={i}
          isCurrent={isCurrent}
          teams={pot}
          pickedTeams={pickedTeams}
          selectedTeams={selectedTeams}
          background={HEADER_BACKGROUND}
          color={HEADER_COLOR}
        />
      )
    })}
  </Root>
)

export default memo(PotsContainer)

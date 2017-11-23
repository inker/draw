import * as React from 'react'
import styled from 'styled-components'
import { difference } from 'lodash'

import Team from 'model/team'
import Pot from './Pot'

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: nowrap;
  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`

interface Props {
  forceAllActive?: boolean,
  initialPots: Team[][],
  pots: Team[][],
  selectedTeams: Team[] | null,
  currentPotNum: number,
}

class PotsContainer extends React.PureComponent<Props> {
  getPickedTeams(potNum: number) {
    const {
      pots,
      initialPots,
      selectedTeams,
    } = this.props
    return 
  }

  render() {
    const {
      initialPots,
      pots,
      selectedTeams,
      currentPotNum,
      forceAllActive,
    } = this.props

    return (
      <Root>
        {initialPots && initialPots.map((pot, i) => {
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
              depleted={!pot || pickedTeams.length === pot.length}
            />
          )
        })}
      </Root>
    )
  }
}

export default PotsContainer

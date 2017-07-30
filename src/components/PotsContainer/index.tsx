import * as React from 'react'
import styled from 'styled-components'
import { difference } from 'lodash'

import { Team } from 'utils/team'
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
  noHung: boolean,
  initialPots: Team[][],
  pots: Team[][],
  selectedTeam: Team | null,
  currentPotNum: number,
}

class PotsContainer extends React.PureComponent<Props> {
  getPickedTeams() {
    const {
      noHung,
      currentPotNum,
      pots,
      initialPots,
      selectedTeam,
    } = this.props
    const diff = difference(initialPots[currentPotNum], pots[currentPotNum], [selectedTeam as Team])
    if (selectedTeam && noHung) {
      diff.push(selectedTeam)
    }
    return diff
  }

  render() {
    const {
      initialPots,
      selectedTeam,
      currentPotNum,
    } = this.props

    return (
      <Root>
        {initialPots && initialPots.map((pot, i) => {
          const isCurrent = i === currentPotNum
          const pickedTeams = isCurrent ? this.getPickedTeams() : i < currentPotNum ? pot : []
          return (
            <Pot
              key={pot[0].id}
              potNum={i}
              isCurrent={isCurrent}
              teams={pot}
              pickedTeams={pickedTeams}
              selectedTeam={selectedTeam}
            />
          )
        })}
      </Root>
    )
  }
}

export default PotsContainer

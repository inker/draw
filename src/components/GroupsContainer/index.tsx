import React, { PureComponent } from 'react'
import styled from 'styled-components'

import getGroupLetter from 'utils/getGroupLetter'
import Team from 'model/team'
import Group from './Group'

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;
  & > * {
    flex: 1;
    flex-basis: 22%;
  }
  & > :nth-child(-n + ${({ numGroups }) => (numGroups ? numGroups >> 1 : 0)}) {
    background-color: rgb(255, 248, 240);
  }
  & > :nth-child(n + ${({ numGroups }) => (numGroups ? (numGroups >> 1) + 1 : 0)}) {
    background-color: rgb(240, 248, 255);
  }
`

interface Props {
  maxTeams: number,
  currentPotNum: number,
  groups: Team[][],
  possibleGroups: number[] | null,
  airborneTeams: Team[],
}

class GroupsContainer extends PureComponent<Props> {
  render() {
    const {
      maxTeams,
      currentPotNum,
      groups,
      possibleGroups,
      airborneTeams,
    } = this.props
    return (
      <Root numGroups={groups.length}>
        {groups && groups.map((group, i) => {
          const letter = getGroupLetter(i)
          return (
            <Group
              key={letter}
              maxTeams={maxTeams}
              groupLetter={letter}
              teams={group}
              potNum={currentPotNum}
              possible={possibleGroups !== null && possibleGroups.includes(i)}
              airborneTeams={airborneTeams}
            />
          )
        })}
      </Root>
    )
  }
}

export default GroupsContainer

import React from 'react'
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
  selectedTeam: Team | null,
  airborneTeams: Team[],
}

const GroupsContainer: React.SFC<Props> = ({
  maxTeams,
  currentPotNum,
  groups,
  possibleGroups,
  selectedTeam,
  airborneTeams,
}) => (
  <Root numGroups={groups.length}>
    {groups && groups.map((group, i) => (
      <Group
        maxTeams={maxTeams}
        groupLetter={getGroupLetter(i)}
        teams={group}
        potNum={currentPotNum}
        possible={possibleGroups !== null && possibleGroups.includes(i)}
        airborneTeams={airborneTeams}
      />
    ))}
  </Root>
)

export default GroupsContainer

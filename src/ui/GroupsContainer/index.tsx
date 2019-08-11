import React, { memo } from 'react'
import styled from 'styled-components'

import Club from 'model/team/Club'
import NationalTeam from 'model/team/NationalTeam'
import getGroupLetter from 'utils/getGroupLetter'

import Group from './Group'

type Team = Club | NationalTeam

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;

  & > * {
    flex: 1;
    flex-basis: 22%;
  }
`

interface Props {
  maxTeams: number,
  currentPotNum: number,
  groups: Team[][],
  possibleGroups: number[] | null,
  airborneTeams: Team[],
  groupColors?: string[],
}

const GroupsContainer = ({
  maxTeams,
  currentPotNum,
  groups,
  possibleGroups,
  airborneTeams,
  groupColors,
}: Props) => (
  <Root>
    {groups && groups.map((group, i) => {
      const letter = getGroupLetter(i)
      const background = groupColors && groupColors[~~(i / groups.length * groupColors.length)]

      return (
        <Group
          key={letter}
          maxTeams={maxTeams}
          groupLetter={letter}
          teams={group}
          potNum={currentPotNum}
          possible={possibleGroups !== null && possibleGroups.includes(i)}
          airborneTeams={airborneTeams}
          background={background}
        />
      )
    })}
  </Root>
)

export default memo(GroupsContainer)

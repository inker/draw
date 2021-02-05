import {
  memo,
  forwardRef,
} from 'react'
import styled, { FlattenInterpolation } from 'styled-components'

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
  groups: readonly (readonly Team[])[],
  possibleGroups: readonly number[] | null,
  getGroupHeaderStyles?: (index: number) => FlattenInterpolation<any>,
}

const GroupsContainer = forwardRef((
  {
    maxTeams,
    currentPotNum,
    groups,
    possibleGroups,
    getGroupHeaderStyles,
  }: Props,
  ref: any,
) => (
  <Root ref={ref}>
    {groups?.map((group, i) => {
      const letter = getGroupLetter(i)
      const headerStyles = getGroupHeaderStyles?.(i)

      return (
        <Group
          key={letter}
          maxTeams={maxTeams}
          groupLetter={letter}
          teams={group}
          potNum={currentPotNum}
          possible={!!possibleGroups?.includes(i)}
          headerStyles={headerStyles}
        />
      )
    })}
  </Root>
))

export default memo(GroupsContainer)

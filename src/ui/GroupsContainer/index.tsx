import { forwardRef, memo } from 'react';
import styled from 'styled-components';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';
import getGroupLetter from '#utils/getGroupLetter';

import Group from './Group';

type Team = Club | NationalTeam;

const Root = styled.div`
  display: flex;
  flex-flow: row wrap;

  > * {
    flex: 1;
    flex-basis: 22%;
  }
`;

interface Props {
  maxTeams: number;
  currentPotNum: number;
  groups: readonly (readonly Team[])[];
  possibleGroups: readonly number[] | null;
  getGroupHeaderClassName?: (index: number) => string;
}

const GroupsContainer = forwardRef(
  (
    {
      maxTeams,
      currentPotNum,
      groups,
      possibleGroups,
      getGroupHeaderClassName,
    }: Props,
    ref: any,
  ) => (
    <Root ref={ref}>
      {groups?.map((group, i) => {
        const letter = getGroupLetter(i);
        const headerClassName = getGroupHeaderClassName?.(i);

        return (
          <Group
            key={letter}
            maxTeams={maxTeams}
            groupLetter={letter}
            teams={group}
            potNum={currentPotNum}
            possible={!!possibleGroups?.includes(i)}
            headerClassName={headerClassName}
          />
        );
      })}
    </Root>
  ),
);

export default memo(GroupsContainer);

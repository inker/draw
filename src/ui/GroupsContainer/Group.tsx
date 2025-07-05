import { memo } from 'react';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';
import Table from '#ui/table/Table';
import Header from '#ui/table/Header';
import * as cellStyles from '#ui/table/cell.module.scss';

import GroupCellDeferred from './GroupCellDeferred';

type Team = Club | NationalTeam;

interface Props {
  maxTeams: number;
  groupLetter: string;
  teams: readonly Team[];
  potNum: number;
  possible: boolean;
  headerClassName?: string;
}

function Group({
  maxTeams,
  groupLetter,
  teams,
  potNum,
  possible,
  headerClassName,
}: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <td className={cellStyles.root}>
            <Header className={headerClassName}>Group {groupLetter}</Header>
          </td>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxTeams }, (_, i) => (
          <tr key={i}>
            <GroupCellDeferred
              team={teams[i]}
              possible={i === potNum && possible}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default memo(Group);

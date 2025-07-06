import { memo } from 'react';
import clsx from 'clsx';

import type Team from '#model/team';
import Table from '#ui/table/Table';
import Header from '#ui/table/Header';
import * as cellStyles from '#ui/table/cell.module.scss';

import PotRow from '../PotRow';

import * as styles from './styles.module.scss';

interface Props {
  isCurrent: boolean;
  potNum: number;
  teams: readonly Team[];
  pickedTeams: readonly Team[];
  selectedTeams: readonly Team[] | null;
  numCols: number;
  headerClassName?: string;
}

function Pot({
  isCurrent,
  potNum,
  teams,
  pickedTeams,
  selectedTeams,
  numCols,
  headerClassName,
}: Props) {
  const numRows = teams.length / numCols;

  return (
    <Table>
      <thead>
        <tr>
          <td
            className={cellStyles.root}
            colSpan={numCols}
          >
            <Header
              className={clsx(
                styles.header,
                isCurrent && styles.highlighted,
                (!teams || pickedTeams.length === teams.length) &&
                  styles.depleted,
                headerClassName,
              )}
            >
              Pot {potNum + 1}
            </Header>
          </td>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: numRows }, (_, i) => {
          const offset = i * numCols;
          const rowTeams = Array.from(
            { length: numCols },
            // eslint-disable-next-line @typescript-eslint/no-shadow
            (_, c) => teams[offset + c],
          );

          return (
            <PotRow
              key={rowTeams.map(team => team.id).join(':')}
              teams={rowTeams}
              selectedTeams={selectedTeams}
              pickedTeams={pickedTeams}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default memo(Pot);

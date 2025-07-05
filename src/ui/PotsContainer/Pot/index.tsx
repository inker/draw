import { memo } from 'react';

import type Team from '#model/team';
import Table from '#ui/table/Table';
import Row from '#ui/table/Row';
import Cell from '#ui/table/Cell';

import Header from '../PotHeader';
import PotRow from '../PotRow';

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
        <Row>
          <Cell colSpan={numCols}>
            <Header
              $highlighted={isCurrent}
              $depleted={!teams || pickedTeams.length === teams.length}
              className={headerClassName}
            >
              Pot {potNum + 1}
            </Header>
          </Cell>
        </Row>
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

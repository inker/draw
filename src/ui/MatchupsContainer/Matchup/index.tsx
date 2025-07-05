import { memo } from 'react';

import { type EmptyOrSingleOrPair } from '#model/types';
import type Team from '#model/team/Club';
import Row from '#ui/table/Row';
import Cell from '#ui/table/Cell';
import Content from '#ui/table/Content';

import MatchupCellDeferred from '../MatchupCellDeferred';

import * as styles from './styles.module.scss';

interface Props {
  teams: EmptyOrSingleOrPair<Team> | null;
}

function Matchup({ teams }: Props) {
  const [ru, gw] = teams ?? [];

  return (
    <Row>
      <MatchupCellDeferred team={ru} />
      <Cell>
        <Content className={styles['versus-cell']} />
      </Cell>
      <MatchupCellDeferred team={gw} />
    </Row>
  );
}

export default memo(Matchup);

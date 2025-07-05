import { memo } from 'react';

import { type EmptyOrSingleOrPair } from '#model/types';
import type Team from '#model/team/Club';
import * as cellStyles from '#ui/table/cell.module.scss';
import Content from '#ui/table/Content';

import MatchupCellDeferred from '../MatchupCellDeferred';

import * as styles from './styles.module.scss';

interface Props {
  teams: EmptyOrSingleOrPair<Team> | null;
}

function Matchup({ teams }: Props) {
  const [ru, gw] = teams ?? [];

  return (
    <tr>
      <MatchupCellDeferred team={ru} />
      <td className={cellStyles.root}>
        <Content className={styles['versus-cell']} />
      </td>
      <MatchupCellDeferred team={gw} />
    </tr>
  );
}

export default memo(Matchup);

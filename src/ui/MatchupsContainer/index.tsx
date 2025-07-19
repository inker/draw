import { memo } from 'react';

import { type EmptyOrSingleOrPair } from '#model/types';
import type Team from '#model/team/Club';
import Table from '#ui/table/Table';

import Matchup from './Matchup';
import * as styles from './styles.module.scss';

interface Props {
  ref?: React.RefObject<HTMLTableElement | null>;
  matchups: readonly EmptyOrSingleOrPair<Team>[];
}

function MatchupContainer({ ref, matchups }: Props) {
  return (
    <Table
      ref={ref}
      className={styles['root-table']}
    >
      <tbody>
        {matchups.map((matchup, i) => (
          <Matchup
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            teams={matchup}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default memo(MatchupContainer);

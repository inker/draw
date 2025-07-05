import { memo } from 'react';
import { difference } from 'lodash';
import clsx from 'clsx';

import type Team from '#model/team';

import Pot from './Pot';
import * as styles from './styles.module.scss';

interface Props {
  initialPots: readonly (readonly Team[])[];
  pots: readonly (readonly Team[])[];
  selectedTeams: readonly Team[] | null;
  currentPotNum: number;
  split?: boolean;
}

function PotsContainer({
  initialPots,
  pots,
  selectedTeams,
  currentPotNum,
  split,
}: Props) {
  return (
    <div className={clsx(styles.root, !split && styles['limit-width'])}>
      {initialPots.map((pot, i) => {
        const isCurrent = i === currentPotNum;
        const pickedTeams = difference(
          initialPots[i],
          pots[i],
          selectedTeams ?? [],
        );

        return (
          <Pot
            key={pot[0].id}
            potNum={i}
            isCurrent={isCurrent}
            teams={pot}
            pickedTeams={pickedTeams}
            selectedTeams={selectedTeams}
            numCols={split ? 2 : 1}
            headerClassName={styles.header}
          />
        );
      })}
    </div>
  );
}

export default memo(PotsContainer);

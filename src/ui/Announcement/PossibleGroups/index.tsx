import { memo } from 'react';
import clsx from 'clsx';

import getGroupLetter from '#utils/getGroupLetter';

import * as styles from './styles.module.scss';

interface Props {
  numGroups: number;
  possibleGroups: readonly number[];
}

function PossibleGroups({ numGroups, possibleGroups }: Props) {
  const halfNum = numGroups >> 1;

  return (
    <div className={styles.root}>
      {Array.from({ length: numGroups }, (_, i) => {
        const letter = getGroupLetter(i);
        const isPossible = possibleGroups.includes(i);
        return (
          <div
            key={letter}
            className={clsx(styles.roundel, isPossible && styles.possible)}
            style={{
              ...(isPossible
                ? {
                    color: i < halfNum ? 'red' : 'blue',
                    borderColor: i < halfNum ? 'red' : 'blue',
                  }
                : undefined),
            }}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

export default memo(PossibleGroups);

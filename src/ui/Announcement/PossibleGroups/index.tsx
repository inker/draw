import { memo } from 'react';

import getGroupLetter from '#utils/getGroupLetter';

import Roundel from '../Roundel';

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
        return (
          <Roundel
            key={letter}
            color={i < halfNum ? 'red' : 'blue'}
            $possible={possibleGroups.includes(i)}
          >
            {letter}
          </Roundel>
        );
      })}
    </div>
  );
}

export default memo(PossibleGroups);

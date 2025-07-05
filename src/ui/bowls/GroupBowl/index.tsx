import { memo, useCallback } from 'react';

import getGroupLetter from '#utils/getGroupLetter';

import Ball from './Ball';
import * as styles from './styles.module.scss';

interface Props {
  display: boolean;
  displayGroups: boolean;
  possibleGroups: readonly number[] | null;
  onPick: (groupNum: number) => void;
}

function GroupBowl({ display, displayGroups, possibleGroups, onPick }: Props) {
  const handleBallPick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      const ball = ev.target as HTMLDivElement;
      const pickedGroup = +ball.dataset.group!;
      if (Number.isNaN(pickedGroup)) {
        throw new TypeError(`Incorrect group ball: ${ball.dataset.group}`);
      }
      onPick(pickedGroup);
    },
    [onPick],
  );

  return (
    <div className={styles.root}>
      {display &&
        possibleGroups?.map(groupNum => (
          <Ball
            key={groupNum}
            data-group={groupNum}
            forceVisible={displayGroups}
            onClick={handleBallPick}
          >
            {getGroupLetter(groupNum)}
          </Ball>
        ))}
    </div>
  );
}

export default memo(GroupBowl);

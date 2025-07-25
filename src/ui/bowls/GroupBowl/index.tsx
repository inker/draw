import { memo, useCallback } from 'react';

import getGroupLetter from '#utils/getGroupLetter';

import BowlBall from '../BowlBall';

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
          <BowlBall
            key={groupNum}
            data-group={groupNum}
            className={styles['group-ball']}
            forceVisible={displayGroups}
            onClick={handleBallPick}
          >
            {getGroupLetter(groupNum)}
          </BowlBall>
        ))}
    </div>
  );
}

export default memo(GroupBowl);

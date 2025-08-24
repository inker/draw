import { memo } from 'react';
import clsx from 'clsx';

import type Team from '#model/team/GsTeam';
import ContentWithFlag from '#ui/table/ContentWithFlag';

import * as styles from './styles.module.scss';

interface Props {
  className?: string;
  data: readonly {
    team: Team;
    location: 'h' | 'a';
  }[];
}

function OpponentList({ className, data }: Props) {
  return (
    <ul className={clsx('reset-list', styles.list, className)}>
      {data.map(item => (
        <li key={`${item.team.id}:${item.location}`}>
          <div className={styles.grid}>
            <div className={styles['grid-inner']}>
              <div className={styles['item-content-inner']}>
                <ContentWithFlag
                  country={item.team.country}
                  className={styles['content-with-flag']}
                >
                  {item.team.name}
                </ContentWithFlag>
                {item.location.toUpperCase()}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(OpponentList);

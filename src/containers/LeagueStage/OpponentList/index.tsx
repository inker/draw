import { memo, useId, useLayoutEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { difference } from 'lodash';

import usePrevious from '#utils/hooks/usePrevious';
import type Team from '#model/team/GsTeam';
import ContentWithFlag from '#ui/table/ContentWithFlag';

import * as styles from './styles.module.scss';

interface Item {
  team: Team;
  location: 'h' | 'a';
}

const getKey = (item: Item) => `${item.team.id}:${item.location}`;

interface Props {
  className?: string;
  animationDurationMs: number;
  data: readonly Item[];
}

function OpponentList({ className, animationDurationMs, data }: Props) {
  const containerId = useId();
  const rootRef = useRef<HTMLUListElement>(null);

  const noAnimationItemsRef = useRef(new Set<string>());
  const animationElementsRef = useRef(new Set<string>());

  const prevLength = usePrevious(data.length);

  const prevLengthRef = useRef(prevLength);

  if (prevLength !== prevLengthRef.current) {
    prevLengthRef.current = prevLength;
  }

  if (
    prevLengthRef.current !== undefined &&
    prevLengthRef.current > data.length
  ) {
    for (const item of data) {
      noAnimationItemsRef.current.add(getKey(item));
    }
  }

  const keys = useMemo(() => data.map(getKey), [data]);
  const prevKeys = usePrevious(keys);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const runAnimations = () => {
      const newKeys = difference(keys, prevKeys ?? []);
      for (const key of newKeys) {
        if (animationElementsRef.current.has(key)) {
          continue;
        }
        const isLast = key === keys.at(-1);
        animationElementsRef.current.add(key);
        const gridEl = root.querySelector(
          `[data-id="${containerId}:grid:${key}"]`,
        );
        const innerEl = root.querySelector(
          `[data-id="${containerId}:inner:${key}"]`,
        );
        (async () => {
          const noAnimation = noAnimationItemsRef.current.has(key);
          if (!isLast && !noAnimation) {
            await gridEl!.animate(
              [
                {
                  gridTemplateRows: '0fr',
                },
                {},
              ],
              {
                duration: animationDurationMs / 2,
              },
            ).finished;
          }
          await Promise.all([
            (async () => {
              await gridEl!.animate(
                [
                  {
                    // transform: `translateX(8px)`,
                    filter: 'grayscale(1)',
                    ...(isLast && !noAnimation
                      ? {
                          gridTemplateRows: '0fr',
                        }
                      : undefined),
                  },
                  {},
                ],
                {
                  duration: animationDurationMs,
                },
              ).finished;
            })(),
            innerEl!.animate(
              [
                {
                  opacity: '0',
                },
                {
                  opacity: '1',
                },
              ],
              {
                duration: animationDurationMs,
                fill: 'forwards',
              },
            ).finished,
          ]);
          animationElementsRef.current.delete(key);
        })();
      }
    };

    runAnimations();
  }, [keys]);

  return (
    <ul
      ref={rootRef}
      className={clsx('reset-list', styles.list, className)}
    >
      {data.map(item => {
        const key = getKey(item);
        return (
          <li key={key}>
            <div
              data-id={`${containerId}:grid:${key}`}
              className={clsx(styles.grid)}
            >
              <div className={styles['grid-inner']}>
                <div
                  data-id={`${containerId}:inner:${key}`}
                  className={styles['item-content-inner']}
                >
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
        );
      })}
    </ul>
  );
}

export default memo(OpponentList);

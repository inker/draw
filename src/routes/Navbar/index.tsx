import { memo, useCallback } from 'react';
import clsx from 'clsx';

import type Tournament from '#model/Tournament';
import type Stage from '#model/Stage';
import useTheme from '#store/useTheme';
import useMedia from '#utils/hooks/useMedia';
import useDrawId from '#store/useDrawId';
import useXRay from '#store/useXRay';
import useFastDraw from '#store/useFastDraw';
import Checkbox from '#ui/Checkbox';
import Button from '#ui/Button';

import SelectSeason from './SelectSeason';
import SelectTheme from './SelectTheme';
import GitHubButtons from './GitHubButtons';
import * as styles from './styles.module.scss';

interface Props {
  season: number;
  tournament: Tournament;
  stage: Stage;
  className?: string;
  onSeasonChange: (
    tournament: Tournament,
    stage: Stage,
    season?: number,
  ) => void;
}

function Navbar({
  season,
  tournament,
  stage,
  className,
  onSeasonChange,
}: Props) {
  const [theme, setTheme] = useTheme();
  const [isXRay, setIsXRay] = useXRay();
  const [, refreshDrawId] = useDrawId();
  const [isFastDraw, setIsFastDraw] = useFastDraw();

  const isWidth900 = useMedia('(min-width: 900px)');
  const isWidth700 = useMedia('(min-width: 700px)');

  const disableFastDrawAndRestart = useCallback(() => {
    setIsFastDraw(false);
    refreshDrawId();
  }, []);

  const enableFastDraw = useCallback(() => {
    setIsFastDraw(true);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div
        id="navbar-left-container"
        className={styles['nav-bar-left-container']}
      />
      <div>
        <Button onClick={disableFastDrawAndRestart}>Restart</Button>
        <Button
          isDisabled={isFastDraw}
          onClick={enableFastDraw}
        >
          Fast draw
        </Button>
        <SelectSeason
          tournament={tournament}
          stage={stage}
          season={season}
          onChange={onSeasonChange}
        />
        <Checkbox
          value={isXRay}
          onChange={setIsXRay}
        >
          X-ray
        </Checkbox>
        <SelectTheme
          value={theme}
          onChange={setTheme}
        />
      </div>
      <div>
        {isWidth900 && <GitHubButtons />}
        <small>
          {isWidth700 ? 'Crafted with ♡ by' : '©'}{' '}
          <a
            href="https://github.com/inker"
            target="_blank"
            rel="noopener noreferrer"
            className="styled-link"
          >
            inker
          </a>
        </small>
      </div>
    </div>
  );
}

export default memo(Navbar);

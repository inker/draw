import { type RefObject, memo, useEffect, useRef } from 'react';

import type Club from '#model/team/Club';
import type NationalTeam from '#model/team/NationalTeam';
import ButtonLink from '#ui/ButtonLink';
import Dots from '#ui/Dots';
import Deferred from '#ui/Deferred';
import getGroupLetter from '#utils/getGroupLetter';

import PossibleGroups from './PossibleGroups';
import LongCalculation from './LongCalculation';
import Download from './Download';
import * as styles from './styles.module.scss';

type Team = Club | NationalTeam;

interface Props {
  long: boolean;
  completed: boolean;
  selectedTeam: Team | null;
  pickedGroup: number | null;
  possibleGroups: readonly number[] | null;
  isDisplayPossibleGroupsText?: boolean;
  numGroups: number;
  groupsElement: RefObject<HTMLElement | null>;
  reset: any;
}

function Announcement({
  long,
  completed,
  selectedTeam,
  pickedGroup,
  possibleGroups,
  isDisplayPossibleGroupsText,
  numGroups,
  groupsElement,
  reset,
}: Props) {
  const lastAnnouncementRef = useRef<React.ReactElement | null>(null);
  const lastSelectedRef = useRef<Team | null>(null);

  useEffect(() => {
    lastSelectedRef.current = completed ? null : selectedTeam;
  }, [completed, selectedTeam]);

  const selected = lastSelectedRef.current ?? selectedTeam;

  if (completed) {
    return (
      <div className={styles.root}>
        <div className={styles.completed}>
          <div>Draw completed!</div>
          <Download
            completed={completed}
            groupsElement={groupsElement}
          />
          <ButtonLink onClick={reset}>Restart</ButtonLink>
        </div>
      </div>
    );
  }

  if (pickedGroup !== null) {
    lastAnnouncementRef.current = (
      <div className={styles.root}>
        <div>
          {long && selected ? (
            <span>
              <strong className={styles.bold}>
                {(selected as Club).shortName ?? selected.name}
              </strong>{' '}
              goes to group
            </span>
          ) : (
            <span>Group</span>
          )}
          &nbsp;
          <strong className={styles.bold}>{getGroupLetter(pickedGroup)}</strong>
          !
        </div>
      </div>
    );
    return lastAnnouncementRef.current;
  }

  if (selected) {
    return (
      <div className={styles.root}>
        {isDisplayPossibleGroupsText ? (
          <div>
            Possible groups for{' '}
            <span className={styles['selected-team-with-colon']}>
              <strong className={styles.bold}>{selected.name}</strong>:
            </span>
            {possibleGroups ? (
              <PossibleGroups
                numGroups={numGroups}
                possibleGroups={possibleGroups}
              />
            ) : (
              <div>
                <Dots
                  initialNum={0}
                  maxNum={10}
                  interval={2000}
                />
                <Deferred delay={10000}>
                  <LongCalculation />
                </Deferred>
              </div>
            )}
          </div>
        ) : (
          lastAnnouncementRef.current
        )}
      </div>
    );
  }

  return <div className={styles.root}>Pick a ball</div>;
}

export default memo(Announcement);

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import delay from 'delay.js';
import { constant, orderBy, stubArray } from 'lodash';

import PotsContainer from '#ui/PotsContainer';
import GroupsContainer from '#ui/GroupsContainer';
import * as bowlsContainerStyles from '#ui/bowls-container.module.scss';
import TeamBowl from '#ui/bowls/TeamBowl';
import Announcement from '#ui/Announcement';
import { serializeGsWorkerData } from '#model/WorkerData';
import type Team from '#model/team/NationalTeam';
import useWorkerSendAndReceive from '#utils/hooks/useWorkerSendAndReceive';
import usePrngGenerator from '#utils/hooks/usePrngGenerator';
import prngShuffleAll from '#utils/prng/shuffleAll';
import useXRay from '#store/useXRay';
import useFastDraw from '#store/useFastDraw';
import useDrawId from '#store/useDrawId';
import usePopup from '#store/usePopup';

import { type Func } from './worker';
import * as styles from './styles.module.scss';

const createWorker = () => new Worker(new URL('./worker', import.meta.url));

const getGroupHeaderClassName = constant(styles['group-header']);

interface Props {
  season: number;
  pots: readonly (readonly Team[])[];
}

interface State {
  currentPotNum: number;
  selectedTeam: Team | null;
  pickedGroup: number | null;
  hungPot: readonly Team[];
  pots: readonly (readonly Team[])[];
  groups: readonly (readonly Team[])[];
}

function getState(pots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0;
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: pots[currentPotNum],
    pots,
    groups: pots[0].map(stubArray),
  };
}

function WCGS({ season, pots: initialPots }: Props) {
  const [, setNewDrawId] = useDrawId();
  const [isFastDraw] = useFastDraw();
  const prngGenerator = usePrngGenerator();

  const [
    { currentPotNum, selectedTeam, pickedGroup, hungPot, pots, groups },
    setState,
  ] = useState(() => getState(initialPots));

  // The shuffle is async, so the pots render in source order for a tick
  // & fast draw has to wait it out or pick off an unseeded order.
  const [arePotsShuffled, setArePotsShuffled] = useState(false);

  useEffect(() => {
    setArePotsShuffled(false);
    (async () => {
      const shuffledPots = await prngShuffleAll({
        collections: initialPots,
        prngGenerator,
      });
      setState(getState(shuffledPots));
      setArePotsShuffled(true);
    })();
  }, [initialPots, prngGenerator]);

  const [, setPopup] = usePopup();
  const [isXRay] = useXRay();

  const getFirstPossibleGroupResponse = useWorkerSendAndReceive(
    createWorker,
  ) as Func;

  const groupsContanerRef = useRef<HTMLDivElement>(null);

  const handleTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team');
    }

    let newPickedGroup: number;
    try {
      const firstPossibleGroup = await getFirstPossibleGroupResponse(
        serializeGsWorkerData({
          season,
          pots,
          groups,
          selectedTeam,
        }),
      );
      newPickedGroup = firstPossibleGroup;
    } catch (err) {
      console.error(err);
      setPopup({
        error: 'Could not determine the group',
      });
      return;
    }

    const newGroups = groups.with(newPickedGroup, [
      ...groups[newPickedGroup],
      selectedTeam,
    ]);
    const newCurrentPotNum =
      pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1;

    setState(state => ({
      ...state,
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      groups: newGroups,
    }));
  };

  const handleTeamBallPick = useCallback(
    (i: number) => {
      if (selectedTeam) {
        return;
      }

      const currentPot = pots[currentPotNum];
      const newSelectedTeam = currentPot[i];
      if (!newSelectedTeam) {
        return;
      }

      const newPots = pots.with(
        currentPotNum,
        pots[currentPotNum].toSpliced(i, 1),
      );

      setState(state => ({
        ...state,
        selectedTeam: newSelectedTeam,
        pickedGroup: null,
        pots: newPots,
      }));
    },
    [pots, currentPotNum, selectedTeam],
  );

  useEffect(() => {
    if (selectedTeam) {
      handleTeamSelected();
    }
  }, [selectedTeam]);

  // After the shuffle, or these picks are wiped by the shuffled pots landing.
  useEffect(() => {
    if (!arePotsShuffled) {
      return;
    }
    (async () => {
      // pick host balls
      const forcedTeams = pots
        .flat()
        .filter(team => team.forcedGroupIndex !== undefined);
      const orderedForcedTeams = orderBy(
        forcedTeams,
        team => team.forcedGroupIndex,
      );
      for (const forcedTeam of orderedForcedTeams) {
        setState(state => {
          const newPickedGroup = forcedTeam.forcedGroupIndex!;
          // TODO: pot index should not be hard-coded
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { currentPotNum } = state;
          const newPots = state.pots.with(
            currentPotNum,
            state.pots[currentPotNum].toSpliced(
              state.pots[currentPotNum].indexOf(forcedTeam),
              1,
            ),
          );
          const newGroups = state.groups.with(newPickedGroup, [
            ...state.groups[newPickedGroup],
            forcedTeam,
          ]);
          return {
            ...state,
            selectedTeam: null,
            pickedGroup: newPickedGroup,
            pots: newPots,
            hungPot: newPots[currentPotNum],
            groups: newGroups,
          };
        });
        // eslint-disable-next-line no-await-in-loop
        await delay(100);
      }
    })();
  }, [arePotsShuffled]);

  const completed = currentPotNum >= pots.length;

  useEffect(() => {
    // TODO: make hungPot nullable
    const hungPotSize = hungPot?.length;
    if (arePotsShuffled && isFastDraw && hungPotSize) {
      // The pot is already in seeded random order,
      // so the front ball is as uniform as a random index.
      handleTeamBallPick(0);
    }
  }, [arePotsShuffled, isFastDraw, hungPot]);

  const numGroups = groups.length;

  return (
    <div className="page-root">
      <div className="tables-container">
        <PotsContainer
          selectedTeams={selectedTeam && [selectedTeam]}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
        />
        <GroupsContainer
          ref={groupsContanerRef}
          maxTeams={pots.length}
          currentPotNum={currentPotNum}
          groups={groups}
          possibleGroups={null}
          getGroupHeaderClassName={getGroupHeaderClassName}
        />
      </div>
      <div className={bowlsContainerStyles.root}>
        {!isFastDraw && (
          <TeamBowl
            forceNoSelect={!!selectedTeam}
            display={!completed}
            displayTeams={isXRay}
            selectedTeam={selectedTeam}
            pot={hungPot}
            onPick={handleTeamBallPick}
          />
        )}
        <Announcement
          long
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={null}
          isDisplayPossibleGroupsText={!!selectedTeam}
          numGroups={numGroups}
          groupsElement={groupsContanerRef}
          reset={setNewDrawId}
        />
      </div>
    </div>
  );
}

export default memo(WCGS);

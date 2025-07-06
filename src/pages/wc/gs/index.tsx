import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { constant, random, shuffle, stubArray } from 'lodash';

import PotsContainer from '#ui/PotsContainer';
import GroupsContainer from '#ui/GroupsContainer';
import * as bowlsContainerStyles from '#ui/bowls-container.module.scss';
import TeamBowl from '#ui/bowls/TeamBowl';
import Announcement from '#ui/Announcement';
import { serializeGsWorkerData } from '#model/WorkerData';
import type Team from '#model/team/NationalTeam';
import useWorkerSendAndReceive from '#utils/hooks/useWorkerSendAndReceive';
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

function getState(initialPots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0;
  const pots = initialPots.map(pot => shuffle(pot));
  const currentPot = pots[currentPotNum];
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    pots,
    groups: initialPots[0].map(stubArray),
  };
}

function WCGS({ season, pots: initialPots }: Props) {
  const [drawId, setNewDrawId] = useDrawId();
  const [isFastDraw] = useFastDraw();

  const [
    { currentPotNum, selectedTeam, pickedGroup, hungPot, pots, groups },
    setState,
  ] = useState(() => getState(initialPots));

  useEffect(() => {
    setState(getState(initialPots));
  }, [initialPots, drawId]);

  const [, setPopup] = usePopup();
  const [isXRay] = useXRay();

  const getFirstPossibleGroupResponse = useWorkerSendAndReceive(
    createWorker,
  ) as Func;

  const groupsContanerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    // pick host ball
    const i = pots[currentPotNum].findIndex(team => team.host);
    handleTeamBallPick(i);
    // TODO: should be drawId
  }, [pots]);

  const completed = currentPotNum >= pots.length;

  useEffect(() => {
    // TODO: make hungPot nullable
    const hungPotSize = hungPot?.length;
    if (isFastDraw && hungPotSize) {
      const index = random(hungPotSize - 1);
      handleTeamBallPick(index);
    }
  }, [isFastDraw, hungPot]);

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

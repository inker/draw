import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { css } from 'styled-components'

import {
  random,
  sample,
  shuffle,
} from 'lodash'

import type Team from 'model/team/GsTeam'
import {
  type GsWorkerData,
  type GsWorkerFirstPossibleResponseData,
  type GsWorkerPossibleGroupsResponseData,
} from 'model/WorkerData'

import usePopup from 'store/usePopup'
import useDrawId from 'store/useDrawId'
import useFastDraw from 'store/useFastDraw'
import useXRay from 'store/useXRay'

import useWorkerSendAndReceive from 'utils/hooks/useWorkerSendAndReceive'

import PageRoot from 'ui/PageRoot'
import PotsContainer from 'ui/PotsContainer'
import GroupsContainer from 'ui/GroupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import GroupBowl from 'ui/bowls/GroupBowl'
import Announcement from 'ui/Announcement'

const getAllPossibleGroupsWorker = () =>
  new Worker(new URL('./allPossibleGroupsWorker', import.meta.url))

const getFirstPossibleGroupWorker = () =>
  new Worker(new URL('./firstPossibleGroupWorker', import.meta.url))

const redGroup = css`
  background-color: ${props => props.theme.isDarkMode ? '#933' : '#ffc0c0'};
`

const blueGroup = css`
  background-color: ${props => props.theme.isDarkMode ? '#039' : '#c0e0ff'};
`

interface Props {
  season: number,
  pots: readonly (readonly Team[])[],
  isFirstPotShortDraw?: boolean,
}

interface State {
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: readonly Team[],
  possibleGroups: readonly number[] | null,
  possibleGroupsShuffled: readonly number[] | null,
  pots: readonly (readonly Team[])[],
  groups: readonly (readonly Team[])[],
}

function getState(initialPots: readonly (readonly Team[])[]): State {
  const currentPotNum = 0
  const pots = initialPots.map(pot => shuffle(pot))
  const currentPot = pots[currentPotNum]
  return {
    currentPotNum,
    selectedTeam: null,
    pickedGroup: null,
    hungPot: currentPot,
    possibleGroups: null,
    possibleGroupsShuffled: null,
    pots,
    groups: initialPots[0].map(() => [] as Team[]),
  }
}

function CLGS({
  season,
  pots: initialPots,
  isFirstPotShortDraw,
}: Props) {
  const [drawId, setNewDrawId] = useDrawId()
  const [isFastDraw, setIsFastDraw] = useFastDraw()

  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    possibleGroups,
    possibleGroupsShuffled,
    pots,
    groups,
  }, setState] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()

  // eslint-disable-next-line max-len
  const getFirstPossibleGroupResponse = useWorkerSendAndReceive<GsWorkerData<Team>, GsWorkerFirstPossibleResponseData>(getFirstPossibleGroupWorker)
  // eslint-disable-next-line max-len
  const getAllPossibleGroupsResponse = useWorkerSendAndReceive<GsWorkerData<Team>, GsWorkerPossibleGroupsResponseData>(getAllPossibleGroupsWorker)

  const groupsContanerRef = useRef<HTMLElement>(null)

  const isDrawShort = isFirstPotShortDraw && currentPotNum === 0
  const isNoGroupBallPick = isFastDraw || isDrawShort

  const onTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    let newPossibleGroups: number[] | undefined
    try {
      if (isDrawShort) {
        const response = await getFirstPossibleGroupResponse({
          season,
          pots,
          groups,
          selectedTeam,
        })
        newPossibleGroups = [response.pickedGroup]
      } else {
        const response = await getAllPossibleGroupsResponse({
          season,
          pots,
          groups,
          selectedTeam,
        })
        newPossibleGroups = response.possibleGroups
      }
    } catch (err) {
      console.error(err)
      setPopup({
        error: 'Could not determine the group',
      })
      return
    }

    setState({
      selectedTeam,
      pickedGroup: null,
      hungPot,
      currentPotNum,
      possibleGroups: newPossibleGroups,
      possibleGroupsShuffled: shuffle(newPossibleGroups),
      pots,
      groups,
    })
  }

  const onTeamBallPick = useCallback((i: number) => {
    if (selectedTeam) {
      return
    }

    const currentPot = pots[currentPotNum]
    const newSelectedTeam = currentPot[i]
    if (!newSelectedTeam) {
      return
    }

    const newPots = pots.slice()
    newPots[currentPotNum] = newPots[currentPotNum].filter((_, idx) => idx !== i)

    setState({
      currentPotNum,
      hungPot,
      selectedTeam: newSelectedTeam,
      possibleGroups,
      possibleGroupsShuffled,
      pickedGroup: null,
      pots: newPots,
      groups,
    })
  }, [pots, groups, currentPotNum, hungPot, selectedTeam, possibleGroups, possibleGroupsShuffled])

  const onGroupBallPick = useCallback((newPickedGroup: number) => {
    if (!selectedTeam) {
      setPopup({
        error: 'No selected team...',
      })
      return
    }

    const newGroups = groups.slice()
    newGroups[newPickedGroup] = [
      ...newGroups[newPickedGroup],
      selectedTeam,
    ]

    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    setState({
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      pots,
      groups: newGroups,
    })
  }, [pots, groups, selectedTeam, currentPotNum, hungPot])

  useEffect(() => {
    if (selectedTeam) {
      onTeamSelected()
    }
  }, [selectedTeam])

  const completed = currentPotNum >= pots.length

  useEffect(() => {
    // TODO: make hungPot nullable
    const hungPotSize = hungPot?.length
    if (isFastDraw && hungPotSize) {
      const index = random(hungPotSize - 1)
      onTeamBallPick(index)
    }
  }, [isFastDraw, hungPot])

  useEffect(() => {
    if (isNoGroupBallPick && possibleGroupsShuffled?.length) {
      const index = isDrawShort
        ? Math.min(...possibleGroupsShuffled)
        : sample(possibleGroupsShuffled)!

      onGroupBallPick(index)
    }
  }, [isNoGroupBallPick, possibleGroupsShuffled])

  useEffect(() => {
    if (completed && isFastDraw) {
      setIsFastDraw(false)
    }
  }, [completed, isFastDraw])

  const numGroups = groups.length

  const getGroupHeaderStyles = useCallback(
    (i: number) => i < (numGroups >> 1) ? redGroup : blueGroup,
    [numGroups],
  )

  return (
    <PageRoot>
      <TablesContainer>
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
          possibleGroups={isNoGroupBallPick ? null : possibleGroups}
          getGroupHeaderStyles={getGroupHeaderStyles}
        />
      </TablesContainer>
      <BowlsContainer>
        {!isFastDraw && (
          <TeamBowl
            display={!completed}
            displayTeams={isXRay}
            selectedTeam={selectedTeam}
            pot={hungPot}
            onPick={onTeamBallPick}
          />
        )}
        <Announcement
          long={false}
          completed={completed}
          selectedTeam={selectedTeam}
          pickedGroup={pickedGroup}
          possibleGroups={isFastDraw ? null : possibleGroups}
          isDisplayPossibleGroupsText={!!selectedTeam}
          numGroups={numGroups}
          groupsElement={groupsContanerRef}
          reset={setNewDrawId}
        />
        {!isNoGroupBallPick && (
          <GroupBowl
            display={!completed}
            displayGroups={isXRay}
            possibleGroups={possibleGroupsShuffled}
            onPick={onGroupBallPick}
          />
        )}
      </BowlsContainer>
    </PageRoot>
  )
}

export default memo(CLGS)

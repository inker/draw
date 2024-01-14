import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { css } from 'styled-components'
import { random, shuffle } from 'lodash'

import type Team from 'model/team/GsTeam'
import { serializeGsWorkerData } from 'model/WorkerData'

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
import Announcement from 'ui/Announcement'

import { type Func } from './worker'

const createWorker = () => new Worker(new URL('./worker', import.meta.url))

const redGroup = css`
  background-color: ${props => (props.theme.isDarkMode ? '#933' : '#ffc0c0')};
`

const blueGroup = css`
  background-color: ${props => (props.theme.isDarkMode ? '#039' : '#c0e0ff')};
`

interface Props {
  season: number
  pots: readonly (readonly Team[])[]
}

interface State {
  currentPotNum: number
  selectedTeam: Team | null
  pickedGroup: number | null
  hungPot: readonly Team[]
  pots: readonly (readonly Team[])[]
  groups: readonly (readonly Team[])[]
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
    pots,
    groups: initialPots[0].map(() => [] as Team[]),
  }
}

function ELGS({ season, pots: initialPots }: Props) {
  const [drawId, setNewDrawId] = useDrawId()
  const [isFastDraw] = useFastDraw()

  const [
    { currentPotNum, selectedTeam, pickedGroup, hungPot, pots, groups },
    setState,
  ] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()

  const getFirstPossibleGroupResponse = useWorkerSendAndReceive(
    createWorker,
  ) as Func

  const groupsContanerRef = useRef<HTMLElement>(null)

  const handleTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    let newPickedGroup: number
    try {
      const firstPossibleGroup = await getFirstPossibleGroupResponse(
        serializeGsWorkerData({
          season,
          pots,
          groups,
          selectedTeam,
        }),
      )
      newPickedGroup = firstPossibleGroup
    } catch (err) {
      console.error(err)
      setPopup({
        error: 'Could not determine the group',
      })
      return
    }

    const newGroups = groups.slice()
    newGroups[newPickedGroup] = [...newGroups[newPickedGroup], selectedTeam]
    const newCurrentPotNum =
      pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1

    setState(state => ({
      ...state,
      selectedTeam: null,
      pickedGroup: newPickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      groups: newGroups,
    }))
  }

  const handleTeamBallPick = useCallback(
    (i: number) => {
      if (selectedTeam) {
        return
      }

      const currentPot = pots[currentPotNum]
      const newSelectedTeam = currentPot[i]
      if (!newSelectedTeam) {
        return
      }

      const newPots = pots.slice()
      newPots[currentPotNum] = newPots[currentPotNum].filter(
        (_, idx) => idx !== i,
      )

      setState(state => ({
        ...state,
        selectedTeam: newSelectedTeam,
        pickedGroup: null,
        pots: newPots,
      }))
    },
    [pots, currentPotNum, selectedTeam],
  )

  useEffect(() => {
    if (selectedTeam) {
      handleTeamSelected()
    }
  }, [selectedTeam])

  const completed = currentPotNum >= pots.length

  useEffect(() => {
    // TODO: make hungPot nullable
    const hungPotSize = hungPot?.length
    if (isFastDraw && hungPotSize) {
      const index = random(hungPotSize - 1)
      handleTeamBallPick(index)
    }
  }, [isFastDraw, hungPot])

  const numGroups = groups.length

  const getGroupHeaderStyles = useCallback(
    (i: number) => (i < numGroups >> 1 ? redGroup : blueGroup),
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
          possibleGroups={null}
          getGroupHeaderStyles={getGroupHeaderStyles}
        />
      </TablesContainer>
      <BowlsContainer>
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
      </BowlsContainer>
    </PageRoot>
  )
}

export default memo(ELGS)

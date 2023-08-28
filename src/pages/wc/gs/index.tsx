import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { css } from 'styled-components'

import {
  constant,
  random,
  shuffle,
} from 'lodash'

import type Team from 'model/team/NationalTeam'
import {
  type GsWorkerData,
  type GsWorkerFirstPossibleResponseData,
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
import Announcement from 'ui/Announcement'

const getEsWorker = () =>
  new Worker(new URL('./worker', import.meta.url))

const getGroupHeaderStyles = constant(css`
  background-color: ${props => props.theme.isDarkMode ? '#363' : '#c0e0c0'};
`)

interface Props {
  season: number,
  pots: readonly (readonly Team[])[],
}

interface State {
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: readonly Team[],
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
    pots,
    groups: initialPots[0].map(() => [] as Team[]),
  }
}

function WCGS({
  season,
  pots: initialPots,
}: Props) {
  const [drawId, setNewDrawId] = useDrawId()
  const [isFastDraw, setIsFastDraw] = useFastDraw()

  const [{
    currentPotNum,
    selectedTeam,
    pickedGroup,
    hungPot,
    pots,
    groups,
  }, setState] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const [, setPopup] = usePopup()
  const [isXRay] = useXRay()

  // eslint-disable-next-line max-len
  const getFirstPossibleGroupResponse = useWorkerSendAndReceive<GsWorkerData<Team>, GsWorkerFirstPossibleResponseData>(getEsWorker)

  const groupsContanerRef = useRef<HTMLElement>(null)

  const onTeamSelected = async () => {
    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    let newPickedGroup: number | undefined
    try {
      const response = await getFirstPossibleGroupResponse({
        season,
        pots,
        groups,
        selectedTeam,
      })
      newPickedGroup = response.pickedGroup
    } catch (err) {
      console.error(err)
      setPopup({
        error: 'Could not determine the group',
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
      currentPotNum: newCurrentPotNum,
      pots,
      groups: newGroups,
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
      pickedGroup: null,
      pots: newPots,
      groups,
    })
  }, [pots, groups, currentPotNum, hungPot, selectedTeam])

  useEffect(() => {
    if (selectedTeam) {
      onTeamSelected()
    }
  }, [selectedTeam])

  useEffect(() => {
    // pick host ball
    const i = pots[currentPotNum].findIndex(team => team.host)
    onTeamBallPick(i)
    // TODO: should be drawId
  }, [pots])

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
    if (completed && isFastDraw) {
      setIsFastDraw(false)
    }
  }, [completed, isFastDraw])

  const numGroups = groups.length

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
            onPick={onTeamBallPick}
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

export default memo(WCGS)

import React, { PureComponent } from 'react'
import delay from 'delay.js'
import isShallowEqual from 'shallowequal'
import {
  omit,
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/GSTeam'

import WorkerWrapper from 'utils/WorkerWrapper'
import animateContentTransfer from 'utils/animateContentTransfer'
import getGroupLetter from 'utils/getGroupLetter'

import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import GroupsContainer from 'ui/GroupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'
// @ts-ignore
import EsWorker from './worker'

const groupColors = [
  'rgba(255, 0, 0, 0.25)',
  'rgba(0, 128, 255, 0.25)',
]

interface Props {
  pots: Team[][],
}

interface State {
  drawId: string,
  initialPots: Team[][],
  pots: Team[][],
  groups: Team[][],
  maxTeamsInGroup: number,
  airborneTeams: Team[],
  currentPotNum: number,
  selectedTeam: Team | null,
  pickedGroup: number | null,
  hungPot: Team[],
  calculating: boolean,
  longCalculating: boolean,
  completed: boolean,
  error: string | null,
}

export default class ELGS extends PureComponent<Props, State> {
  private workerWrapper = new WorkerWrapper(new EsWorker(), 120000)

  constructor(props: Props) {
    super(props)
    this.state = this.getNewState()
  }

  componentWillUnmount() {
    this.workerWrapper.terminate()
  }

  private onReset = () => {
    this.setState(this.getNewState())
  }

  private getNewState(): State {
    const initialPots = this.props.pots
    const currentPotNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    return {
      drawId: uniqueId('draw-'),
      initialPots,
      pots,
      groups: currentPot.map(team => []),
      maxTeamsInGroup: pots.length,
      airborneTeams: [],
      currentPotNum,
      selectedTeam: null,
      pickedGroup: null,
      hungPot: currentPot,
      calculating: false,
      longCalculating: false,
      completed: false,
      error: null,
    }
  }

  private onTeamBallPick = async (i: number) => {
    const {
      pots,
      currentPotNum,
    } = this.state

    const currentPot = pots[currentPotNum]
    const hungPot = currentPot.slice()
    const selectedTeam = currentPot.splice(i, 1)[0]

    this.setState({
      hungPot,
      selectedTeam,
      pickedGroup: null,
      calculating: true,
    }, this.onTeamSelect)
  }

  private onTeamSelect = async () => {
    this.setLongCalculating()

    const {
      pots,
      groups,
      selectedTeam,
      currentPotNum,
    } = this.state

    if (!selectedTeam) {
      throw new Error('no selected team')
    }

    const pickedGroup = await this.getPickedGroup()
    if (pickedGroup === undefined) {
      this.setState({
        error: 'Could not determine the group',
      })
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1
    const completed = newCurrentPotNum >= pots.length

    this.state.airborneTeams.push(selectedTeam)
    const animation = this.animateCell(selectedTeam, pickedGroup)

    this.setState({
      groups,
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      currentPotNum: newCurrentPotNum,
      calculating: false,
      longCalculating: false,
      completed,
      airborneTeams: this.state.airborneTeams,
    }, async () => {
      await animation
      this.setState({
        airborneTeams: this.state.airborneTeams.filter(team => team !== selectedTeam),
      })
    })
  }

  private async getPickedGroup() {
    try {
      const {
        pots,
        groups,
        selectedTeam,
        currentPotNum,
      } = this.state

      const { pickedGroup } = await this.workerWrapper.sendAndReceive({
        pots,
        groups,
        selectedTeam,
        currentPotNum,
      })

      return pickedGroup as number
    } catch (err) {
      console.error(err)
    }
  }

  private async setLongCalculating() {
    const oldState = omit(this.state as State, 'airborneTeams')

    await delay(3000)
    const currentState = omit(this.state as State, 'airborneTeams')
    if (!isShallowEqual(currentState, oldState)) {
      return
    }

    this.setState({
      longCalculating: true,
    })
  }

  private animateCell(selectedTeam: Team, pickedGroup: number) {
    const { currentPotNum } = this.state
    if (!selectedTeam) {
      return
    }
    const fromCell = document.querySelector(`[data-cellid='${selectedTeam.id}']`)
    const toCellSelector = `[data-cellid='${getGroupLetter(pickedGroup)}${currentPotNum}']`
    const toCell = document.querySelector(toCellSelector)
    if (fromCell instanceof HTMLElement && toCell instanceof HTMLElement) {
      return animateContentTransfer(fromCell, toCell, 350)
    }
  }

  render() {
    const {
      initialPots,
      pots,
      groups,
      maxTeamsInGroup,
      currentPotNum,
      hungPot,
      airborneTeams,
      selectedTeam,
      pickedGroup,
      calculating,
      longCalculating,
      completed,
    } = this.state

    return (
      <Root>
        <TablesContainer>
          <PotsContainer
            selectedTeams={selectedTeam && [selectedTeam]}
            initialPots={initialPots}
            pots={pots}
            currentPotNum={currentPotNum}
          />
          <GroupsContainer
            maxTeams={maxTeamsInGroup}
            currentPotNum={currentPotNum}
            groups={groups}
            possibleGroups={null}
            airborneTeams={airborneTeams}
            groupColors={groupColors}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            forceNoSelect={calculating}
            display={!completed}
            selectedTeam={selectedTeam}
            pot={hungPot}
            onPick={this.onTeamBallPick}
          />
          <Announcement
            long
            calculating={longCalculating}
            completed={completed}
            selectedTeam={selectedTeam}
            pickedGroup={pickedGroup}
            possibleGroups={null}
            numGroups={groups.length}
            reset={this.onReset}
          />
        </BowlsContainer>
      </Root>
    )
  }
}

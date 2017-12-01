import React, { PureComponent } from 'react'
import delay from 'delay.js'
import {
  omit,
  shuffle,
  uniqueId,
} from 'lodash'

import Team from 'model/team/GSTeam'

import animateContentTransfer from 'utils/animateContentTransfer'
import getGroupLetter from 'utils/getGroupLetter'
import isShallowEqual from 'utils/isShallowEqual'

import PotsContainer from 'components/PotsContainer'
// import AirborneContainer from 'components/AirborneContainer'
import GroupsContainer from 'components/GroupsContainer'
import TablesContainer from 'components/TablesContainer'
import BowlsContainer from 'components/BowlsContainer'
import TeamBowl from 'components/bowls/TeamBowl'
import Announcement from 'components/Announcement'

import Root from 'pages/Root'
import EsWorker from './worker'

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

export default class GS extends PureComponent<Props, State> {

  private worker: Worker

  componentDidMount() {
    this.reset()
  }

  componentWillUnmount() {
    if (this.worker) {
      this.worker.terminate()
    }
  }

  private reset = () => {
    if (this.worker) {
      this.worker.terminate()
    }
    this.worker = new (EsWorker as any)()
    this.worker.onmessage = this.workerOnMessage
    const initialPots = this.props.pots
    const currentPotNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    this.setState({
      drawId: `draw-${uniqueId()}`,
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
    })
  }

  private onTeamBallPick = (i: number) => {
    const {
      groups,
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
    }, () => {
      this.setLongCalculating(this.state)
    })

    this.worker.postMessage({
      pots,
      groups,
      selectedTeam,
      currentPotNum,
    })
  }

  private async setLongCalculating({ airborneTeams, ...oldState }: State) {
    await delay(3000)
    const currentState = omit(this.state as State, 'airborneTeams') as typeof oldState
    if (!isShallowEqual(currentState, oldState)) {
      return
    }
    this.setState({
      longCalculating: true,
    })
  }

  private workerOnMessage = (e: MessageEvent) => {
    const {
      selectedTeam,
      pickedGroup,
    } = e.data
    const {
      groups,
      pots,
      currentPotNum,
    } = this.state

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1
    const completed = newCurrentPotNum >= pots.length
    if (completed) {
      this.worker.terminate()
    }
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
    if (!this.state) {
      return null
    }
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
            selectedTeam={selectedTeam}
            currentPotNum={currentPotNum}
            groups={groups}
            possibleGroups={null}
            airborneTeams={airborneTeams}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            calculating={calculating}
            completed={completed}
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
            reset={this.reset}
          />
        </BowlsContainer>
      </Root>
    )
  }
}

import React, { PureComponent } from 'react'
import { shuffle, uniqueId } from 'lodash'

import Team from 'model/team/GSTeam'
import { allPossibleGroups } from 'model/possible-groups'
// import predicate from 'model/experimental/predicate'

import animateContentTransfer from 'utils/animateContentTransfer'
import getGroupLetter from 'utils/getGroupLetter'

import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import GroupsContainer from 'ui/GroupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import GroupBowl from 'ui/bowls/GroupBowl'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'

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
  possibleGroups: number[] | null,
  possibleGroupsShuffled: number[] | null,
  completed: boolean,
  error: string | null,
}

export default class CLGS extends PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.reset(true)
  }

  private onReset = () => {
    this.reset(false)
  }

  private reset(isNew: boolean) {
    const initialPots = this.props.pots
    const currentPotNum = 0
    const pots = initialPots.map(pot => shuffle(pot))
    const currentPot = pots[currentPotNum]
    const newState = {
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
      possibleGroups: null,
      possibleGroupsShuffled: null,
      completed: false,
      error: null,
    }
    if (isNew) {
      this.state = newState
    } else {
      this.setState(newState)
    }
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
    // const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum, predicate)
    const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, currentPotNum)

    this.setState({
      hungPot,
      selectedTeam,
      possibleGroups,
      possibleGroupsShuffled: shuffle(possibleGroups),
      pickedGroup: null,
    })
  }

  private onGroupBallPick = (pickedGroup: number) => {
    const {
      groups,
      airborneTeams,
      selectedTeam,
      pots,
      currentPotNum,
    } = this.state

    if (!selectedTeam) {
      this.setState({
        error: 'shit',
      })
      return
    }

    groups[pickedGroup].push(selectedTeam)
    const newCurrentPotNum = pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1
    airborneTeams.push(selectedTeam)
    const animation = this.animateCell(pickedGroup)

    this.setState({
      selectedTeam: null,
      pickedGroup,
      hungPot: pots[newCurrentPotNum],
      possibleGroups: null,
      possibleGroupsShuffled: null,
      currentPotNum: newCurrentPotNum,
      completed: newCurrentPotNum >= pots.length,
      airborneTeams,
    }, async () => {
      const newAirborneTeams = this.state.airborneTeams.filter(team => team !== selectedTeam)
      await animation
      this.setState({
        airborneTeams: newAirborneTeams,
      })
    })
  }

  private animateCell(pickedGroup: number) {
    const { selectedTeam, currentPotNum } = this.state
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
      possibleGroups,
      possibleGroupsShuffled,
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
            possibleGroups={possibleGroups}
            airborneTeams={airborneTeams}
            groupColors={groupColors}
          />
        </TablesContainer>
        <BowlsContainer>
          <TeamBowl
            completed={completed}
            selectedTeam={selectedTeam}
            pot={hungPot}
            onPick={this.onTeamBallPick}
          />
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={selectedTeam}
            pickedGroup={pickedGroup}
            possibleGroups={possibleGroups}
            numGroups={groups.length}
            reset={this.onReset}
          />
          <GroupBowl
            completed={completed}
            possibleGroups={possibleGroupsShuffled}
            onPick={this.onGroupBallPick}
          />
        </BowlsContainer>
      </Root>
    )
  }
}

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { GSTeam as Team } from '../../team'

import countryNames from '../../../json/country-names'
import getPossibleGroups from './possible-groups'

import Pot from '../Pot'
import Group from '../Group'

type Props = {

}

type State = {
    pots: Team[][],
    groups: Team[][],
    currentPotNum: number,
    pickedTeam: Team,
    pickedGroup: number,
    possibleGroups: number[],
    completed: boolean,
}

export default class extends PureComponent<Props, State> {
    private initialPots: Team[][]

    constructor(props) {
        super(props)
        this.initialPots = props.pots
        this.reset()
    }

    protected reset() {
        const pots = this.initialPots.map(pot => pot.slice())
        this.setState({
            ...this.state,
            pots: pots.map(pot => pot.slice()),
            groups: pots[0].map(team => []),
            pickedGroup: -1,
            completed: false,
        })
    }

    private onTeamBallPick = (ev: React.MouseEvent<HTMLDivElement>) => {
        const ball = ev.target as HTMLDivElement
        const { groups, pots, currentPotNum } = this.state
        const currentPot = pots[currentPotNum]
        const i = currentPot.findIndex(team => team.name === ball.textContent)
        const pickedTeam = currentPot.splice(i, 1)[0]
        const possibleGroups = getPossibleGroups(pots, groups, pickedTeam, currentPotNum)
        this.setState({
            ...this.state,
            pickedTeam,
            possibleGroups,
            pickedGroup: -1,
        })
    }

    private onGroupBallPicked = (ev: React.MouseEvent<HTMLDivElement>) => {
        const pickedGroup = +ev.target['dataset'].group
        const { state } = this
        const { 
            groups,
            pickedTeam,
            pots,
        } = state
        groups[pickedGroup].push(pickedTeam)
        let {
            currentPotNum,
            completed,
        } = state
        if (pots[currentPotNum].length === 0) {
            if (currentPotNum === pots.length - 1) {
                completed = true
            } else {
                ++currentPotNum
            }
        }
        this.setState({
            ...state,
            pickedTeam: null,
            pickedGroup,
            possibleGroups: null,
            currentPotNum: pots[currentPotNum].length > 0 ? currentPotNum : currentPotNum + 1,
            completed,
        })
    }

    render() {
        const {
            pots,
            groups,
            currentPotNum,
            pickedTeam,
            pickedGroup,
            possibleGroups,
            completed,
        } = this.state
        const possiblesText = possibleGroups && possibleGroups.map(i => String.fromCharCode(65 + i)).join(', ')
        return (
            <div>
                <div id="tables-div">
                    <div id="pots-div">{
                        !completed && pots && pots.map((pot, i) => (
                            <Pot
                                potNum={i}
                                teams={pot.map(team => ({
                                    team,
                                    selected: team === pickedTeam,
                                    picked: groups.some(group => group.includes(team)),
                                }))}
                            />
                        ))
                    }</div>
                    <div id="groups-div">{
                        !completed && groups && groups.map((group, i) => (
                            <Group
                                groupLetter={String.fromCharCode(65 + i)}
                                teams={group}
                                potNum={currentPotNum}
                                possible={possibleGroups.includes(i)}
                            />
                        ))
                    }</div>
                </div>
                <div id="bowls-div">
                    <div
                        id="team-bowl"
                        className={classNames('bowl', {
                            'dont-touch': !!pickedTeam,
                        })}
                    >{
                        !completed && pots && pots[currentPotNum].map((team, i) => {
                            const classes = `ball ${team === pickedTeam ? 'ball-picked' : ''}`
                            return (
                                <div
                                    className={classes}
                                    data-team={i}
                                    onClick={this.onTeamBallPick}
                                >
                                    {team.name}
                                </div>
                            )
                        })
                    }</div>
                    <div id="announcement">{
                        possiblesText ? `Possible groups for ${pickedTeam.name}: ${possiblesText}` :
                        pickedGroup > -1 ? `Group ${String.fromCharCode(65 + pickedGroup)}!` :
                        !completed ? 'Pick a ball' : 'Draw completed!'
                    }{completed && (
                        <a onClick={e => this.reset()}>Restart</a>
                    )}</div>
                    <div id="group-bowl" className="bowl">{
                        !completed && possibleGroups && possibleGroups.map(groupNum => {
                            return (
                                <div
                                    className="ball"
                                    data-group={groupNum}
                                    onClick={this.onGroupBallPicked}
                                >
                                    {String.fromCharCode(65 + groupNum)}
                                </div>
                            )
                        })
                    }</div>
                </div>
            </div>
        )
    }
}

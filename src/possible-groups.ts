import { GSTeam as Team } from './team';

export default function (pots: Team[][], groups: Team[][], teamPicked: Team, currentPotIndex: number): number[] {
    if (groups.every(group => group.length === 0)) {
        return groups.map((group, index) => index);
    }
    return filterGroupsBasic(groups, teamPicked, currentPotIndex).filter(groupNum => {
        groups[groupNum].push(teamPicked);
        const hasDescendants = simulateDraw(pots, groups, currentPotIndex);
        groups[groupNum].pop();
        return hasDescendants;
    });
}

function simulateDraw(pots: Team[][], groups: Team[][], currentPotIndex: number): boolean {
    if (pots[currentPotIndex].length === 0) {
        ++currentPotIndex;
        if (currentPotIndex === pots.length) {
            return true;
        }
    }
    const currentPot = pots[currentPotIndex];
    const team = currentPot.pop();
    let hasDescendants = false;
    for (let groupNum of filterGroupsBasic(groups, team, currentPotIndex)) {
        const group = groups[groupNum];
        group.push(team);
        hasDescendants = simulateDraw(pots, groups, currentPotIndex);
        group.pop();
        if (hasDescendants) break;
    }
    currentPot.push(team);
    return hasDescendants;
}

function filterGroupsBasic(groups: Team[][], teamPicked: Team, currentPotIndex: number): number[] {
    const bottom = filterSomeGroups(groups, teamPicked, currentPotIndex, 0, groups.length >> 1);
    const top = filterSomeGroups(groups, teamPicked, currentPotIndex, groups.length >> 1, groups.length);
    return bottom.length === 0 ? top : top.length === 0 ? bottom : bottom.concat(top);
}

function filterSomeGroups(groups: Team[][], teamPicked: Team, currentPotIndex: number, start: number, end: number): number[] {
    const possibles: number[] = [];
    for (let i = start; i < end; ++i) {
        const group = groups[i];
        let canDraw = true;
        for (let team of group) {
            if (team.country === teamPicked.country) {
                canDraw = false;
                if (team.pairing === teamPicked) return [];
                break;
            }
        }
        if (canDraw && group.length <= currentPotIndex) {
            possibles.push(i);
        }
    }
    return possibles;
}
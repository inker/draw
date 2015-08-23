/// <reference path="../typings/tsd.d.ts"/>
import getPossibleGroups from './possible-groups';
import Team from './team';
import { notify, shuffle, getPos, getCell, Vec2, moveElement, getElementSize } from './util';

class DrawVisualizer {
    private pots: Team[][];
    private groups: Team[][];
    private announcement: HTMLElement;
    private teamBowl: HTMLElement;
    private groupBowl: HTMLElement;
    private potsDiv: HTMLElement;
    private groupsDiv: HTMLElement;
    private currentPotNum: number;
    
    constructor(pots: Team[][], groups: Team[][]) {
        this.pots = pots;
        this.groups = groups;

        let tables = document.createElement('div');
        tables.id = 'tables-div';
        
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        for (let i = 0; i < pots.length; ++i) {
            let pot = pots[i];
            let table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Pot ${i + 1}</th></tr></thead><tbody></tbody>`;
            let tBody: any = table.tBodies[0];
            for (let j = 0; j < pot.length; ++j) {
                let cell = tBody.insertRow(j).insertCell();
                cell.textContent = pot[j].name;
                if (pot[j].pairing !== undefined) {
                    cell.title = 'paired with ' + pot[j].pairing.name;
                }
            }
            this.potsDiv.appendChild(table);
        }
        
        this.groupsDiv = document.createElement('div');
        this.groupsDiv.id = 'groups-div';
        for (let i = 0; i < pots[0].length; ++i) {
            let table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Group ${String.fromCharCode(65 + i)}</th></tr></thead><tbody></tbody>`;
            let tBody: any = table.tBodies[0];
            for (let j = 0; j < pots.length; ++j) {
                tBody.insertRow(j).insertCell();
            }
            this.groupsDiv.appendChild(table)
        }
        
        tables.appendChild(this.potsDiv);
        tables.appendChild(this.groupsDiv);
        document.body.appendChild(tables);
        
        let bowls = document.createElement('div');
        bowls.id = 'bowls-div';
        
        this.teamBowl = document.createElement('div');
        this.teamBowl.id = 'team-bowl';
        this.teamBowl.classList.add('bowl');
        bowls.appendChild(this.teamBowl);

        this.announcement = document.createElement('div');
        this.announcement.id = 'announcement';
        bowls.appendChild(this.announcement);
        
        this.groupBowl = document.createElement('div');
        this.groupBowl.id = 'group-bowl';
        this.groupBowl.classList.add('bowl');
        bowls.appendChild(this.groupBowl);
        document.body.appendChild(bowls);
        
        this.currentPotNum = 0;
    }
    
    public runDraw(): void {
        if (this.currentPotNum > 0 || this.groups.some(g => g.length > 0) || this.pots.some(p => p.length < 8)) {
            throw new Error('cannot start draw');
        }
        this.fillTeamBowl();
        this.announcement.textContent = 'Pick a ball';
    }

    private fillTeamBowl(): void {
        const pot = this.pots[this.currentPotNum];
        let balls = pot.map((team, i) => {
            let ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', e => this.onTeamBallPick(e));
            return ball;
        });
        shuffle(balls).forEach(ball => this.teamBowl.appendChild(ball));
    }

    private onTeamBallPick(e): void {
        this.teamBowl.style.cursor = 'not-allowed';
        this.teamBowl.style.pointerEvents = 'none';
        let ball = e.target;
        ball.classList.add('picked');
        let currentPot = this.pots[this.currentPotNum];
        for (var i = 0; i < currentPot.length; ++i) {
            if (currentPot[i].name === ball.textContent) {
                break;
            }
        }
        let team: Team = currentPot.splice(i, 1)[0];
        const possibles = getPossibleGroups(this.pots, this.groups, team, this.currentPotNum);
        
        let potCell = getCell(this.potsDiv.children[this.currentPotNum], parseInt(ball.dataset['team']));
        potCell.style.color = '#00f';
        
        this.announcement.textContent = `Possible groups for ${team.name}: ${possibles.map(i => String.fromCharCode(65 + i)).join(', ')}`;
        this.fillGroupBowl(possibles, team, ball);
    }

    private fillGroupBowl(possibleGroups: number[], team: Team, teamBall: any): void {
        let groupBalls = possibleGroups.map(groupNum => {
            let groupBall = document.createElement('div');
            groupBall.classList.add('ball');
            groupBall.textContent = String.fromCharCode(65 + groupNum);
            groupBall.dataset['group'] = groupNum.toString();
            groupBall.addEventListener('click', e => {
                this.teamBowl.removeChild(teamBall);
                let groupNum = parseInt(e.target['dataset']['group']);
                this.animateCell(team, <any>teamBall, groupNum);
                this.onGroupBallPick(team, groupNum);
            });
            return groupBall;
        });
        shuffle(groupBalls).forEach(groupBall => this.groupBowl.appendChild(groupBall));
    }

    private onGroupBallPick(team: Team, groupNum: number): void {
        this.groupBowl.innerHTML = '';
        this.announcement.textContent = `Group ${String.fromCharCode(65 + groupNum)}!`;
        this.groups[groupNum].push(team);

        this.teamBowl.style.pointerEvents = 'auto';
        this.teamBowl.style.cursor = null;
        this.teamBowl.onclick = null;
        
        if (this.pots[this.currentPotNum].length > 0) return;
        
        this.potsDiv.children[this.currentPotNum]['style'].color = '#c0c0c0';
        if (this.currentPotNum < 3) {
            ++this.currentPotNum;
            this.fillTeamBowl();
            this.announcement.textContent = 'Pick a ball';
        } else {
            let bowls = this.groupBowl.parentElement;
            bowls.removeChild(this.groupBowl);
            bowls.removeChild(this.teamBowl);
            this.announcement.textContent = 'Draw completed!';
        }
        
    }
    
    animateCell(team: Team, teamBall: HTMLElement, groupNum: number): void {
        const groupCell = getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
        const potCell = getCell(this.potsDiv.children[this.currentPotNum], parseInt(teamBall.dataset['team']));
        potCell.style.color = '#c0c0c0';
        
        const fakeCell = document.createElement('span');
        document.body.appendChild(fakeCell);
        fakeCell.classList.add('fake-cell');
        fakeCell.style.width = potCell.offsetWidth + 'px';
        fakeCell.style.height = potCell.offsetHeight + 'px';
        fakeCell.textContent = potCell.textContent;
        fakeCell.style.position = 'absolute';
        const potCellPos = getPos(potCell);
        fakeCell.style.left = potCellPos.x + 'px';
        fakeCell.style.top = potCellPos.y + 'px';
        const paddingLeft = getElementSize(potCell, 'padding-left');
        const paddingTop = getElementSize(potCell, 'padding-top');
        const cellHeight = getElementSize(potCell, 'height');
        const fontSize = getElementSize(potCell, 'font-size');
        const padding = new Vec2(paddingLeft + 1, paddingTop + (cellHeight - fontSize) / 2);
        const newPos = getPos(groupCell).subtract(potCellPos).add(padding);
        moveElement(fakeCell, padding, newPos, 300, () => {
            document.body.removeChild(fakeCell);
            groupCell.classList.add('team-emerge');
            groupCell.textContent = team.name;
        });
    }
    
}

export default DrawVisualizer;
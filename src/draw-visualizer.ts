/// <reference path="../typings/tsd.d.ts"/>
import getPossibleGroups from './possible-groups';
import Team from './team';
import { shuffle, getPos, getCell, Vec2, moveElement, getElementSize } from './util';

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
        
        let countryNamesPromise = window['fetch']('json/country-names.json').then(data => data.json());
        
        let tables = document.createElement('div');
        tables.id = 'tables-div';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        pots.forEach((pot, i) => {
            let table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Pot ${i + 1}</th></tr></thead><tbody></tbody>`;
            let tBody: any = table.tBodies[0];
            for (let j = 0; j < pot.length; ++j) {
                let cell = tBody.insertRow(j).insertCell();
                cell.classList.add('flag');
                cell.innerHTML = pot[j].name;
                if (pot[j].pairing !== undefined) {
                    cell.title = 'paired with ' + pot[j].pairing.name;
                }
            }
            // to circumvent the restriction of using block-scored variables declared in loops in functions
            [].slice.call(tBody.rows).map(row => row.cells[0]).forEach((cell, j) => {
                countryNamesPromise.then(countries => cell.style.backgroundImage = `url(http://icons.iconarchive.com/icons/gosquared/flag/16/${countries[pot[j].country.toLowerCase().replace(' ', '-')]}-flat-icon.png)`);
            });
            this.potsDiv.appendChild(table);
        });
        
        this.groupsDiv = document.createElement('div');
        this.groupsDiv.id = 'groups-div';
        for (let i = 0; i < pots[0].length; ++i) {
            let table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Group ${String.fromCharCode(65 + i)}</th></tr></thead><tbody></tbody>`;
            let tBody: any = table.tBodies[0];
            for (let j = 0; j < pots.length; ++j) {
                tBody.insertRow(j).insertCell().classList.add('flag');
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
        ball.classList.add('ball-picked');
        let currentPot = this.pots[this.currentPotNum];
        for (var i = 0; i < currentPot.length; ++i) {
            if (currentPot[i].name === ball.textContent) {
                break;
            }
        }
        let team: Team = currentPot.splice(i, 1)[0];
        const possibles = getPossibleGroups(this.pots, this.groups, team, this.currentPotNum);
        for (let groupNum of possibles) {
            let possibleGroupCell = getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
            possibleGroupCell.classList.add('possible-group');
        }
        
        let potCell = getCell(this.potsDiv.children[this.currentPotNum], parseInt(ball.dataset['team']));
        potCell.classList.add('team-selected');
        
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
        
        let groupTables = this.groupsDiv.children;
        for (let i = 0; i < groupTables.length; ++i) {
            if (i !== groupNum) {
                getCell(groupTables[i], this.currentPotNum).classList.remove('possible-group')
            }
        }
        
        if (this.pots[this.currentPotNum].length > 0) return;
        
        this.potsDiv.children[this.currentPotNum]['tHead'].classList.add('greyed');
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
        potCell.classList.remove('team-selected');
        potCell.classList.add('greyed');
        
        const fakeCell = document.createElement('span');
        document.body.appendChild(fakeCell);
        fakeCell.classList.add('fake-cell');
        fakeCell.classList.add('flag');
        fakeCell.style.width = potCell.offsetWidth + 'px';
        //fakeCell.style.height = getElementSize(potCell, 'height') + 'px';
        fakeCell.textContent = potCell.textContent;
        fakeCell.style.position = 'absolute';
        
        const potCellPos = getPos(potCell);
        fakeCell.style.left = potCellPos.x + 'px';
        fakeCell.style.top = potCellPos.y + 'px';
        fakeCell.style.backgroundImage = window.getComputedStyle(potCell, null).getPropertyValue('background-image');
        
        const paddingLeft = getElementSize(potCell, 'padding-left');
        const paddingTop = getElementSize(potCell, 'padding-top');
        const cellHeight = getElementSize(potCell, 'height');
        const fontSize = getElementSize(potCell, 'font-size');
        const padding = new Vec2(paddingLeft, paddingTop + (cellHeight - fontSize) / 2);
        const oldPos = new Vec2(1, padding.y - 0.5);
        const newPos = getPos(groupCell).subtract(potCellPos).add(oldPos);
        
        moveElement(fakeCell, oldPos, newPos, 300, () => {
            document.body.removeChild(fakeCell);
            groupCell.textContent = team.name;
            groupCell.style.backgroundImage = potCell.style.backgroundImage;
            groupCell.classList.remove('possible-group');
            groupCell.classList.add('team-emerge');
        });
    }
    
}

export default DrawVisualizer;
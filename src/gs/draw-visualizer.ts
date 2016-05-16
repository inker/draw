import getPossibleGroups from './possible-groups';
import { GSTeam as Team } from '../team';
import { shuffle, getCell, animateContentTransfer, removeAllChildren } from '../util';
import Visualizer from '../visualizer';

class GSDrawVisualizer extends Visualizer {
    protected pots: Team[][];
    private groups: Team[][];
    private teamBowl: HTMLElement;
    private groupBowl: HTMLElement;
    private groupsDiv: HTMLElement;
    private currentPotNum: number;
    private pickedTeam: Team;
    
    protected prepareDraw(pots: Team[][]): void {
        const countryNamesPromise = window['fetch']('json/country-names.json').then(data => data.json());
        this.pots = pots.map(pot => pot.slice());
        this.groups = [];
        for (let i = 0; i < pots[0].length; ++i) {
            this.groups.push([]);
        }

        const tables = document.createElement('div');
        tables.id = 'tables-div';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        for (let i = 0; i < pots.length; ++i) {
            const pot = pots[i];
            const table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Pot ${i + 1}</th></tr></thead><tbody></tbody>`;
            const tBody: any = table.tBodies[0];
            for (let team of pot) {
                const cell = tBody.insertRow().insertCell();
                cell.textContent = team.name;
                if (team.pairing !== undefined) {
                    cell.title = 'paired with ' + team.pairing.name;
                }
            }
            this.potsDiv.appendChild(table);
        }

        countryNamesPromise.then(countries => {
            const potTables = this.potsDiv.children;
            for (let i = 0; i < potTables.length; ++i) {
                const table: any = this.potsDiv.children[i];
                const rows = table.tBodies[0].rows;
                for (let j = 0; j < rows.length; ++j) {
                    const countryCode = countries[pots[i][j].country.toLowerCase()].replace(' ', '-');
                    const img = `http://icons.iconarchive.com/icons/gosquared/flag/16/${countryCode}-flat-icon.png`;
                    rows[j].cells[0].style.backgroundImage = `url(${img})`;
                }
            }
        });
        
        tables.appendChild(this.potsDiv);

        this.groupsDiv = document.createElement('div');
        this.groupsDiv.id = 'groups-div';
        const groupFrag = document.createDocumentFragment();
        for (let i = 0; i < pots[0].length; ++i) {
            const table = document.createElement('table');
            table.innerHTML = `<thead><tr><th>Group ${String.fromCharCode(65 + i)}</th></tr></thead><tbody>${'<tr><td/></tr>'.repeat(pots.length)}</tbody>`;
            groupFrag.appendChild(table)
        }
        this.groupsDiv.appendChild(groupFrag);

        tables.appendChild(this.groupsDiv);
        document.body.appendChild(tables);

        const bowls = document.createElement('div');
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
        super.runDraw();
    }

    private fillTeamBowl(): void {
        const pot = this.pots[this.currentPotNum];
        for (let i of shuffle(pot.map((el, i) => i))) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', this.onTeamBallPick.bind(this));
            this.teamBowl.appendChild(ball);
        }
    }

    private onTeamBallPick(ev: MouseEvent): void {
        this.teamBowl.classList.add('dont-touch');
        const ball: Element = ev.target as any;
        ball.classList.add('ball-picked');
        const currentPot = this.pots[this.currentPotNum];
        const i = currentPot.findIndex(team => team.name === ball.textContent);
        this.pickedTeam = currentPot.splice(i, 1)[0];
        const possibles = getPossibleGroups(this.pots, this.groups, this.pickedTeam, this.currentPotNum);
        for (let groupNum of possibles) {
            const possibleGroupCell = getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
            possibleGroupCell.classList.add('possible-group');
        }

        const potCell = getCell(this.potsDiv.children[this.currentPotNum], parseInt(ball.getAttribute('data-team')));
        potCell.classList.add('team-selected');
        
        const possiblesText = possibles.map(i => String.fromCharCode(65 + i)).join(', ');
        this.announcement.textContent = `Possible groups for ${this.pickedTeam.name}: ${possiblesText}`;
        this.fillGroupBowl(possibles);
    }

    private fillGroupBowl(possibleGroups: number[]): void {
        for (let groupNum of shuffle(possibleGroups)) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = String.fromCharCode(65 + groupNum);
            ball.dataset['group'] = groupNum.toString();
            ball.addEventListener('click', this.onGroupBallPicked.bind(this));
            this.groupBowl.appendChild(ball);
        }
    }

    private onGroupBallPicked(ev: MouseEvent): void {
        const groupNum = +ev.target['dataset']['group'];
        this.groups[groupNum].push(this.pickedTeam);
        this.pickedTeam = null;
        
        const teamBall = this.teamBowl.querySelector('.ball-picked');
        this.teamBowl.removeChild(teamBall);
        const groupCell = getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
        const potCell = getCell(this.potsDiv.children[this.currentPotNum], +teamBall.getAttribute('data-team'));
        potCell.classList.remove('team-selected');
        potCell.classList.add('greyed');
        animateContentTransfer(potCell, groupCell, 300).then(() => {
            groupCell.classList.remove('possible-group');
            groupCell.classList.add('team-emerge');
        });
        this.announcement.textContent = `Group ${String.fromCharCode(65 + groupNum)}!`;
        
        removeAllChildren(this.groupBowl);
        
        this.teamBowl.classList.remove('dont-touch');
        this.teamBowl.onclick = null;

        const groupTables = this.groupsDiv.children;
        for (let i = 0; i < groupTables.length; ++i) {
            if (i !== groupNum) {
                getCell(groupTables[i], this.currentPotNum).classList.remove('possible-group');
            }
        }

        if (this.pots[this.currentPotNum].length > 0) return;

        this.potsDiv.children[this.currentPotNum]['tHead'].classList.add('greyed');
        if (this.currentPotNum < 3) {
            ++this.currentPotNum;
            this.fillTeamBowl();
            this.announcement.textContent = 'Pick a ball';
        } else {
            const bowls = this.groupBowl.parentElement;
            bowls.removeChild(this.groupBowl);
            bowls.removeChild(this.teamBowl);
            this.announcement.innerHTML = 'Draw completed! ';
            const a = document.getElementById('restart').cloneNode(true);
            a.addEventListener('click', e => this.restart());
            this.announcement.appendChild(a);
        }

    }

}

export default GSDrawVisualizer;
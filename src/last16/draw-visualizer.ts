import getPossibleOpponents from './last16';
import { Last16Team as Team } from '../team';
import { shuffle, getCell, animateContentTransfer, removeAllChildren } from '../util';
import Visualizer from '../visualizer';

class Last16DrawVisualizer extends Visualizer {
    protected initialPots: Team[][];
    private pots: Team[][];
    private matchups: Team[][];
    private announcement: HTMLElement;
    private runnerUpBowl: HTMLElement;
    private groupWinnerBowl: HTMLElement;
    private potsDiv: HTMLElement;
    private matchupDiv: HTMLElement;
    private currentMatchupNum: number;
    
    protected prepareDraw(pots: Team[][]): void {
        const countryNamesPromise = window['fetch']('json/country-names.json').then(data => data.json());
        this.pots = pots.map(pot => pot.slice());
        this.matchups = [];
        for (let i = 0; i < pots[0].length; ++i) {
            this.matchups.push([]);
        }
        const tables = document.createElement('div');
        tables.id = 'tables-div';
        tables.style.width = '400px';
        tables.style.minWidth = '400px';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        const potNames = ['Group winners', 'Runners-up'];
        for (let i = 0; i < pots.length; ++i) {
            const pot = pots[i];
            const table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>${potNames[i]}</th></tr></thead><tbody></tbody>`;
            const tBody: any = table.tBodies[0];
            for (let team of pot) {
                tBody.insertRow().insertCell().textContent = team.name;
            }
            this.potsDiv.appendChild(table);
        }

        countryNamesPromise.then(countries => {
            const potTables = this.potsDiv.children;
            for (let i = 0; i < potTables.length; ++i) {
                const table: any = this.potsDiv.children[i];
                const rows = table.tBodies[0].rows;
                for (let j = 0; j < rows.length; ++j) {
                    const cellStyle = rows[j].cells[0].style;
                    const countryCode = countries[pots[i][j].country.toLowerCase()].replace(' ', '-');
                    cellStyle.backgroundImage = `url(http://icons.iconarchive.com/icons/gosquared/flag/16/${countryCode}-flat-icon.png)`;
                }
            }
        });

        tables.appendChild(this.potsDiv);

        this.matchupDiv = document.createElement('div');
        //this.matchupDiv.id = 'groups-div';
        const table = document.createElement('table');
        table.innerHTML = `<thead><tr><th colspan="3">Matchups</th></tr></thead><tbody></tbody>`;
        table.id = 'matchups';
        const tBody: any = table.tBodies[0];
        for (let i = 0; i < pots[0].length; ++i) {
            const row = tBody.insertRow(i);
            row.insertCell();
            row.insertCell().textContent = 'v';
            row.insertCell();
        }
        this.matchupDiv.appendChild(table)

        tables.appendChild(this.matchupDiv);
        document.body.appendChild(tables);

        const bowls = document.createElement('div');
        bowls.id = 'bowls-div';

        this.runnerUpBowl = document.createElement('div');
        this.runnerUpBowl.id = 'team-bowl';
        this.runnerUpBowl.classList.add('bowl');
        bowls.appendChild(this.runnerUpBowl);

        this.announcement = document.createElement('div');
        this.announcement.id = 'announcement';
        bowls.appendChild(this.announcement);

        this.groupWinnerBowl = document.createElement('div');
        this.groupWinnerBowl.id = 'group-bowl';
        this.groupWinnerBowl.classList.add('bowl');
        bowls.appendChild(this.groupWinnerBowl);
        document.body.appendChild(bowls);

        this.currentMatchupNum = 0;
    }

    public runDraw(): void {
        if (this.currentMatchupNum > 0 || this.matchups.some(g => g.length > 0) || this.pots.some(p => p.length < 8)) {
            console.log('current matchup', this.currentMatchupNum, 
                'matchups', this.matchups.map(m => m.length),
                'pots', this.pots.map(m => m.length));
            throw new Error('cannot start draw');
        }
        this.fillBowl(1, this.pots[1].map((el, i) => i));
        this.announcement.textContent = 'Pick a ball';
    }
    
    private fillBowl(potNumber: number, possibleOpponents: number[]) {
        const clickHandler = (potNumber === 1 ? this.onRunnerUpBallPick : this.onGroupWinnerBallPicked).bind(this),
            bowl = potNumber === 1 ? this.runnerUpBowl : this.groupWinnerBowl,
            pot = this.pots[potNumber],
            shuffledIndices = shuffle(possibleOpponents),
            frag = document.createDocumentFragment();
        for (let i of shuffledIndices) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', clickHandler);
            frag.appendChild(ball);
        }
        bowl.appendChild(frag);
        if (potNumber === 1) return;
        const bowlBalls = bowl.children;
        if (bowlBalls.length === 1) {
            setTimeout(() => (bowlBalls[0] as HTMLElement).click(), 200);
        }        
    }

    private onRunnerUpBallPick(ev: MouseEvent): void {
        this.runnerUpBowl.classList.add('dont-touch');
        const ball: Element = ev.target as any;
        ball.classList.add('ball-picked');
        const [groupWinnerPot, runnerUpPot] = this.pots;
        const i = runnerUpPot.findIndex(team => team.name === ball.textContent);
        const pickedTeam = runnerUpPot.splice(i, 1)[0];
        console.log(pickedTeam.name);
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        const possibles = getPossibleOpponents(this.pots, this.matchups, this.currentMatchupNum);
        const possibleTeamNames = possibles.map(n => groupWinnerPot[n].name);
        const groupWinnerRows = (this.potsDiv.firstElementChild as any).tBodies[0].rows;
        for (let cell of [].map.call(groupWinnerRows, row => row.cells[0])) {
            if (possibleTeamNames.indexOf(cell.textContent) > -1) {
                cell.style.color = '#00f';
            }
        }
        const potCell = getCell(this.potsDiv.lastElementChild, parseInt(ball.getAttribute('data-team')));
        const matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[0];
        animateContentTransfer(potCell, matchupCell, 300).then(() => matchupCell.classList.add('team-emerge'));
        potCell.classList.add('greyed');
        const possiblesText = possibles.map(i => groupWinnerPot[i].name).join(', ');
        this.announcement.textContent = `Possible opponents for ${pickedTeam.name}: ${possiblesText}`;
        this.fillBowl(0, possibles);
        this.groupWinnerBowl.classList.remove('dont-touch');
    }

    private onGroupWinnerBallPicked(ev: MouseEvent): void {
        this.groupWinnerBowl.classList.add('dont-touch');
        const groupWinnerPot = this.pots[0];
        const ball: Element = ev.target as any;
        const i = groupWinnerPot.findIndex(team => team.name === ball.textContent);
        const pickedTeam = groupWinnerPot.splice(i, 1)[0];
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        const cells = [].map.call((this.potsDiv.firstElementChild as any).tBodies[0].rows, row => row.cells[0]);
        for (let c of cells) {
            c.style.color = null;
        }
        const potCell = cells.find(cell => cell.textContent === pickedTeam.name);
        const matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[2];
        animateContentTransfer(potCell, matchupCell, 300).then(() => matchupCell.classList.add('team-emerge'));
        potCell.classList.add('greyed');
        const teamBall = this.runnerUpBowl.querySelector('.ball-picked');
        this.runnerUpBowl.removeChild(teamBall);
        this.announcement.textContent = pickedTeam + '!';

        removeAllChildren(this.groupWinnerBowl);

        this.runnerUpBowl.classList.remove('dont-touch');
        this.runnerUpBowl.onclick = null;

        if (this.currentMatchupNum < 7) {
            ++this.currentMatchupNum;
            this.announcement.textContent = 'Pick a ball';
            const runnerUpBalls = this.runnerUpBowl.children;
            if (runnerUpBalls.length === 1) {
                setTimeout(() => (runnerUpBalls[0] as HTMLElement).click(), 200);
            }
        } else {
            //this.potsDiv.children[this.currentMatchupNum]['tHead'].classList.add('greyed');
            const bowls = this.groupWinnerBowl.parentElement;
            bowls.removeChild(this.groupWinnerBowl);
            bowls.removeChild(this.runnerUpBowl);
            this.potsDiv.classList.add('greyed');
            this.announcement.innerHTML = 'Draw completed! ';
            const a = document.getElementById('restart').cloneNode(true);
            a.addEventListener('click', e => this.restart());
            this.announcement.appendChild(a);
        }

    }

}

export default Last16DrawVisualizer;
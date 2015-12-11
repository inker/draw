import getPossibleOpponents from './last16';
import { Last16Team as Team } from './team';
import { shuffle, getCell, animateCell } from './util';

class Last16Draw {
    private pots: Team[][];
    private matchups: Team[][];
    private announcement: HTMLElement;
    private runnerUpBowl: HTMLElement;
    private groupWinnerBowl: HTMLElement;
    private potsDiv: HTMLElement;
    private matchupDiv: HTMLElement;
    private currentMatchupNum: number;

    constructor(pots: Team[][]) {
        this.pots = pots;
        this.matchups = [];
        for (let i = 0; i < pots[0].length; ++i) {
            this.matchups.push([]);
        }

        const countryNamesPromise = window['fetch']('json/country-names.json').then(data => data.json());

        const tables = document.createElement('div');
        tables.id = 'tables-div';
        tables.style.width = '400px';
        tables.style.minWidth = '400px';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        for (let i = 0; i < pots.length; ++i) {
            const pot = pots[i];
            const table: HTMLTableElement = document.createElement('table');
            table.innerHTML = `<thead><tr><th>${['Group winners', 'Runners-up'][i]}</th></tr></thead><tbody></tbody>`;
            const tBody: any = table.tBodies[0];
            for (let j = 0; j < pot.length; ++j) {
                const cell = tBody.insertRow(j).insertCell();
                cell.classList.add('flag');
                cell.innerHTML = pot[j].name;
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
            const c1 = row.insertCell();
            c1.classList.add('flag');
            const c2 = row.insertCell();
            c2.textContent = 'v';
            const c3 = row.insertCell();
            c3.classList.add('flag');
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
            throw new Error('cannot start draw');
        }
        this.fillRunnerUpBowl();
        this.announcement.textContent = 'Pick a ball';
    }
    
    //private fillBowl(bowl: Element) {
    //    const potNum = bowl === this.runnerUpBowl ? 1 : 0;
    //    const pot = this.pots[potNum];
    //    for (let i of )
    //}

    private fillRunnerUpBowl(): void {
        const pot = this.pots[1];
        for (let i of shuffle(pot.map((el, i) => i))) {
            const team = pot[i];
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            //ball.style.color = 'white';
            //ball.style.fontSize = '1em';
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', this.onRunnerUpBallPick.bind(this));
            this.runnerUpBowl.appendChild(ball);
        }
    }

    private onRunnerUpBallPick(ev: MouseEvent): void {
        this.runnerUpBowl.style.cursor = 'not-allowed';
        this.runnerUpBowl.style.pointerEvents = 'none';
        const ball: Element = ev.target as any;
        ball.classList.add('ball-picked');
        const [groupWinnerPot, runnerUpPot] = this.pots;
        const i = runnerUpPot['findIndex'](team => team.name === ball.textContent);
        const pickedTeam = runnerUpPot.splice(i, 1)[0];
        console.log(pickedTeam.name);
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        const possibles = getPossibleOpponents(this.pots, this.matchups, this.currentMatchupNum);
        const possibleTeamNames = possibles.map(n => groupWinnerPot[n].name);
        for (let cell of [].map.call((this.potsDiv.firstElementChild as any).tBodies[0].rows, row => row.cells[0])) {
            if (possibleTeamNames.indexOf(cell.textContent) > -1) {
                cell.style.color = '#00f';
            }
        }
        const potCell = getCell(this.potsDiv.lastElementChild, parseInt(ball.getAttribute('data-team')));
        const matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[0];
        animateCell(potCell, matchupCell, 300).then(() => matchupCell.classList.add('team-emerge'));
        potCell.classList.add('greyed');
        const possiblesText = possibles.map(i => this.pots[0][i].name).join(', ');
        this.announcement.textContent = `Possible opponents for ${pickedTeam.name}: ${possiblesText}`;
        this.fillGroupWinnerBowl(possibles);
        this.groupWinnerBowl.style.pointerEvents = 'auto';
        this.groupWinnerBowl.style.cursor = 'default';
    }

    private fillGroupWinnerBowl(possibleOpponents: number[]): void {
        for (let i of shuffle(possibleOpponents)) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = this.pots[0][i].name;
            //ball.style.color = 'white';
            //ball.style.fontSize = '1em';
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', this.onGroupWinnerBallPicked.bind(this));
            this.groupWinnerBowl.appendChild(ball);
        }
        if (this.groupWinnerBowl.children.length === 1) {
            setTimeout(() => (this.groupWinnerBowl.firstElementChild as any).click(), 200);
        }
    }

    private onGroupWinnerBallPicked(ev: MouseEvent): void {
        this.groupWinnerBowl.style.cursor = 'not-allowed';
        this.groupWinnerBowl.style.pointerEvents = 'none';
        const ball: Element = ev.target as any;
        const i = this.pots[0]['findIndex'](team => team.name === ball.textContent);
        const pickedTeam = this.pots[0].splice(i, 1)[0];
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        const cells = [].map.call((this.potsDiv.firstElementChild as any).tBodies[0].rows, row => row.cells[0]);
        for (let c of cells) {
            c.style.color = null;
        }
        const potCell = cells.find(cell => cell.textContent === pickedTeam.name);
        const matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[2];
        animateCell(potCell, matchupCell, 300).then(() => matchupCell.classList.add('team-emerge'));
        potCell.classList.add('greyed');
        const teamBall = this.runnerUpBowl.querySelector('.ball-picked');
        this.runnerUpBowl.removeChild(teamBall);
        this.announcement.textContent = pickedTeam + '!';

        this.groupWinnerBowl.innerHTML = '';

        this.runnerUpBowl.style.pointerEvents = 'auto';
        this.runnerUpBowl.style.cursor = 'default';
        this.runnerUpBowl.onclick = null;



        if (this.currentMatchupNum < 7) {
            ++this.currentMatchupNum;
            this.announcement.textContent = 'Pick a ball';
            if (this.runnerUpBowl.children.length === 1) {
                setTimeout(() => (this.runnerUpBowl.firstElementChild as any).click(), 200);
            }
        } else {
            //this.potsDiv.children[this.currentMatchupNum]['tHead'].classList.add('greyed');
            const bowls = this.groupWinnerBowl.parentElement;
            bowls.removeChild(this.groupWinnerBowl);
            bowls.removeChild(this.runnerUpBowl);
            this.potsDiv.classList.add('greyed');
            this.announcement.textContent = 'Draw completed!';
        }

    }

}

export default Last16Draw;
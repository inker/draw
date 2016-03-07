import { fetchPots, parseGS, parseLast16Teams } from './fetch-parse-pots';
import GSDraw from './gs/draw-visualizer';
import Last16Draw from './last16/draw-visualizer';

const fetched = fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2015.html');

const modes = [
    { url: 'gs', name: 'Group stage draw' },
    { url: 'last16', name: 'Last 16 draw' }
];
let currentMode = window.location.search.endsWith('mode=last16') ? 1 : 0;

function visualize(pots: any[][]) {
    return currentMode === 1 ? new Last16Draw(pots) : new GSDraw(pots);
}

function start() {
    window.history.pushState({}, '', '?mode=' + modes[currentMode].url);
    changeModeLink.textContent = 'Go to ' + modes[1 - currentMode].name;
    const parse = currentMode === 1 ? parseLast16Teams : parseGS;
    fetched.then(parse).then(visualize).then(vis => vis.restart()); 
}

function restart(changeMode: boolean) {
    document.body.removeChild(document.getElementById('tables-div'));
    document.body.removeChild(document.getElementById('bowls-div'));
    window.getSelection().empty();
    if (changeMode && ++currentMode >= modes.length) currentMode = 0;
    start();    
}

document.getElementById('restart').addEventListener('click', e => restart(false));

const changeModeLink = document.getElementById('change-mode');
changeModeLink.addEventListener('click', e => restart(true));

start();
import { fetchPots, parseGS, parseLast16Teams } from './fetch-parse-pots';
import DrawVisualizer from './draw-visualizer';
import Last16Draw from './last16vis';

const fetched = fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2015.html');

function visualize(mode: number, pots: any[][]) {
    return mode === 1 ? new Last16Draw(pots) : new DrawVisualizer(pots);
}

function changeMode(mode: number) {
    window.history.pushState({}, '', '?mode=' + modes[currentMode].url);
    changeModeLink.textContent = 'Go to ' + modes[1 - currentMode].name;
    const parse = mode === 1 ? parseLast16Teams : parseGS;
    fetched.then(body => parse(body)).then(pots => visualize(mode, pots).runDraw());
}

const modes = [
    { url: 'gs', name: 'Group stage draw' },
    { url: 'last16', name: 'Last 16 draw' }
];
let currentMode = window.location.search.endsWith('mode=last16') ? 1 : 0;

const changeModeLink = document.getElementById('change-mode');
changeModeLink.onclick = e => {
    document.body.removeChild(document.getElementById('tables-div'));
    document.body.removeChild(document.getElementById('bowls-div'));
    window.getSelection().empty();
    if (++currentMode >= modes.length) currentMode = 0;
    changeMode(currentMode);
};

changeMode(currentMode);
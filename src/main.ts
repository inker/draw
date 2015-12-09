import { fetchPots, parseGS, parseLast16Teams } from './fetch-parse-pots';
import DrawVisualizer from './draw-visualizer';
import Last16Draw from './last16vis';

const groupStageDrawLink = document.getElementById('gs-link');
const fetched = fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2015.html');

groupStageDrawLink.onclick = e => {
    document.body.innerHTML = '';
    fetched.then(body => parseGS(body))
        .then(pots => new DrawVisualizer(pots).runDraw());
};

fetched.then(body => parseLast16Teams(body))
    .then(pots => new Last16Draw(pots).runDraw());

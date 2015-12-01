import fetchPots from './fetch-parse-pots';
import DrawVisualizer from './draw-visualizer';

fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2015.html').then(pots => {
    const view = new DrawVisualizer(pots);
    view.runDraw();
});
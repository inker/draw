import { Team } from './team';

abstract class Visualizer {
    protected initialPots: Team[][];
    constructor(pots: Team[][]) {
        this.initialPots = pots;
        this.prepareDraw(pots);
    }
    protected prepareDraw(pots) {}
    runDraw(): void {}
    restart() {
        document.body.removeChild(document.getElementById('tables-div'));
        document.body.removeChild(document.getElementById('bowls-div'));
        this.prepareDraw(this.initialPots);
        this.runDraw();        
    }
}

export default Visualizer;
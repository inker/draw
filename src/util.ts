/// <reference path="./../typings/tsd.d.ts"/>
import getPossibleGroups from './possible-groups'

export function shuffle<T>(o: T[]): T[] {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

export function getCell(table: Element, n: number): HTMLElement {
    return table['tBodies'][0].rows[n].cells[0];
}

// temporary workaround
// TODO: latin1 -> utf8 conversion
export function convertBadName(badName: string): string {
    return badName.replace(/Malm./, 'Malmö')
        .replace(/Borussia M.nchengladbach/, 'Borussia Mönchengladbach')
        .replace(/Atl.tico/, 'Atlético')
        .replace(/Bayern M.nchen/, 'Bayern München');
}

export function animateCell(sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) {
    return new window['Promise'](resolve => {
        const fakeCell = document.createElement('td');
        fakeCell.style.opacity = null;
        fakeCell.style.position = 'absolute';
        fakeCell.textContent = sourceCell.textContent;
        const computedStyle = getComputedStyle(sourceCell);
        for (let s of ['width', 'border', 'padding', 'padding-left', 'background', 'background-image', 'background-repeat']) {
            fakeCell.style[s] = computedStyle[s];
        }
        const potCellBox = sourceCell.getBoundingClientRect();
        fakeCell.style.transform = `translate(${potCellBox.left}px, ${potCellBox.top}px)`;
        fakeCell.style.height = potCellBox.height - 5 + 'px';
        fakeCell.style.borderColor = 'rgba(0,0,0,0)';
        fakeCell.style.paddingTop = '3px';

        document.body.appendChild(fakeCell);
        
        const groupCellBox = targetCell.getBoundingClientRect();
        fakeCell.style.transition = `transform ${duration}ms ease-in-out`;
        fakeCell.style.transform = `translate3d(${groupCellBox.left}px, ${groupCellBox.top}px, 0px)`;
        setTimeout(() => {
            document.body.removeChild(fakeCell);
            targetCell.textContent = sourceCell.textContent;
            targetCell.style.backgroundImage = sourceCell.style.backgroundImage;
            resolve();
        }, duration); 
    });
}
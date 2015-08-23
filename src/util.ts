/// <reference path="./../typings/tsd.d.ts"/>
import * as countries from "i18n-iso-countries";
import getPossibleGroups from './possible-groups'

export function notify(text: string): void {
    if (!("Notification" in window)) return;
    var Notification = window['Notification'];
    if (Notification.permission === "granted") {
        var notification = new Notification(text);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                var notification = new Notification(text);
            }
        });
    }
}

export function shuffle<T>(o: T[]): T[] {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

export function getPos(el): Vec2 {
    for (var lx = 0, ly = 0; el !== null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return new Vec2(lx, ly);
}

export function getCell(table: Element, n: number): HTMLElement {
    return table['tBodies'][0].rows[n].cells[0];
}

let Promise = window['Promise'];

export function getPossibleGroupsAsync(pots, groups, team, currentPotNum) {
    return new Promise((resolve, reject) => {
        resolve(getPossibleGroups(pots, groups, team, currentPotNum));
    });
}

export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(a: Vec2): Vec2 {
        return new Vec2(this.x + a.x, this.y + a.y);
    }

    subtract(a: Vec2): Vec2 {
        return new Vec2(this.x - a.x, this.y - a.y);
    }

    multiply(multiplier: number): Vec2 {
        return new Vec2(this.x * multiplier, this.y * multiplier);
    }
}

export function moveElement(element: HTMLElement, from: Vec2, to: Vec2, duration: number, callback?: Function): void {
    let start: number = null;

    function step(timestamp: number) {
        if (!start) {
            start = timestamp;
        }
        const progress = timestamp - start;
        const percentage = progress / duration;
        const pos = to.subtract(from).multiply(percentage).add(from);
        element.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0px)`;
        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else if (typeof callback === 'function') {
            callback();
        }
    }

    window.requestAnimationFrame(step);
}

export function getElementSize(element: Element, property: string): number {
    return Number(window.getComputedStyle(element, null).getPropertyValue(property).match(/(.+?)(px|$)/)[1]);
}

export function getCountryName(code: string): string {
    let u = code.toUpperCase();
    if (u === 'RUS') return 'Russia';
    return countries.getName(u, 'en') || {
        'ENG': 'England',
        'GRE': 'Greece',
        'POR': 'Portugal',
        'GER': 'Germany',
        'CRO': 'Croatia',
        'BLS': 'Belarus',
        'SCO': 'Scotland', 
        'RUS': 'Russia', 
        'NED': 'Netherlands', 
        'SUI': 'Switzerland'
    }[u];
}
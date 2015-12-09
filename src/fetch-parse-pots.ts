/// <reference path="./../typings/tsd.d.ts"/>
//import request = require('request');
import { GSTeam, Last16Team } from './team';
import { convertBadName } from './util';

if (!('Promise' in window) || !('fetch' in window)) {
    alert('The draw simulation only works in Chrome, Opera & Firefox.');
}
const Promise = window['Promise'];
const fetch = window['fetch'];

export default function (url: string, groupStage = true) {
    const request = fetchPots(url);
    if (groupStage) {
        return request.then(body => parseGS(body));
    } else {
        return request.then(body => parseLast16Teams(body));
    }

}
export function fetchPots(url: string) {
    const uriEncoded = encodeURIComponent(url);
    return fetch(`https://proxy-antonv.rhcloud.com/?url=${uriEncoded}&encoding=latin1`)
        .then(response => response.text())
        .catch(err => fetch(`https://crossorigin.me/${url}`).then(r => r.text()).then(t => convertBadName(t)))
        .catch(err => alert('proxies are down'));    
}

export function parseGS(body) {
    const pairingsPromise = fetch('json/pairings.json')
        .then(response => response.json());
    const teams = parseGSTeams(body);
    return pairingsPromise
        .then(pairings => pairUpTeams(teams, pairings))
        .then(teams => fillGSPots(teams))
        .catch(err => alert(err.message));
}

export function parseLast16Teams(data: string): Last16Team[][] {
    data = data.slice(data.lastIndexOf('--------------'));
    const pots: Last16Team[][] = [[], []];
    const re = /\s*(.+?)(\s\*+\d?\s+)?\s{2,}(\w{3})\s+(.+?)(\s\*+\d?\s+)?\s{2,}(\w{3})/g;
    let matches: RegExpExecArray;
    for (let i = 0; i < 8 && (matches = re.exec(data)) !== null; ++i) {
        pots[0].push(new Last16Team(matches[1], matches[3], i));
        pots[1].push(new Last16Team(matches[4], matches[6], i));
    }
    return pots;
}

function parseGSTeams(data: string): GSTeam[] {
    const re = /\s*(.+?)\s+(\*+\d?\s+)?(\w{3})\s+(\d{1,3}\.\d{3})/g;
    data = data.slice(data.indexOf('Pot 1'));
    const teams: GSTeam[] = [];
    let matches: RegExpExecArray;
    while ((matches = re.exec(data)) !== null) {
        teams.push(new GSTeam(matches[1], matches[3], parseFloat(matches[4])));
    }
    return teams;
}

function pairUpTeams(teams: GSTeam[], pairStr: string[][]): GSTeam[] {
    pairStr.forEach(str => {
        const pairing = str.map(s => {
            for (let t of teams) {
                if (t.name.indexOf(s) > -1) return t;
            }
            throw new Error(`couldn't find team named ${s}`);
        });
        pairing[0].pairing = pairing[1];
        pairing[1].pairing = pairing[0];
    });
    return teams;
}

function fillGSPots(teams: GSTeam[]): GSTeam[][] {
    const wildCards = ['Barcelona', 'Chelsea', 'Bayern', 'Juventus', 'Benfica', 'Paris', 'Zenit', 'PSV'];
    const pots = new Array<GSTeam[]>(4);
    pots[0] = wildCards.map(wc => {
        for (let t of teams) {
            if (t.name.indexOf(wc) > -1) {
                teams.splice(teams.indexOf(t), 1);
                return t;
            }
        }
        throw new Error(`couldn't find team named ${wc}`);
    });
    teams.sort((t1, t2) => t2.coefficient - t1.coefficient);
    for (let i = 1; i < pots.length; ++i) {
        pots[i] = teams.splice(0, 8);
    }
    return pots;
}
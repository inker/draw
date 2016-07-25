/// <reference path="./../typings/tsd.d.ts"/>
//import request = require('request');
import { GSTeam, Last16Team } from './team';

if (!('Promise' in window) || !('fetch' in window)) {
    alert('The draw simulation only works in Chrome, Opera & Firefox.');
}
const Promise = window['Promise'];
const fetch = window['fetch'];

export default function (url: string, groupStage = true) {
    return fetchPots(url).then(body => (groupStage ? parseGS : parseLast16Teams)(body));

}

export function fetchPots(url: string) {
    return fetch(`https://proxy-antonv.rhcloud.com/?url=${encodeURIComponent(url)}&encoding=latin1`)
        .then(response => response.text())
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
    const re = /\s*(.+?)(\s\*+\d?\s+)?\s{2,}(\w{3})\s+/g;
    let matches: RegExpExecArray;
    for (let i = 0; i < 16 && (matches = re.exec(data)) !== null; ++i) {
        pots[i % 2].push(new Last16Team(matches[1], matches[3], i >> 1));
    }
    return pots;
}

function parseGSTeams(data: string): GSTeam[] {
    const re = /\s*(.+?)\s+(\*+\d?|\([CE]L-TH\))?\s+(\w{3})\s+(\d{1,3}\.\d{3})/g;
    data = data.slice(data.indexOf('Pot 1'));
    const teams: GSTeam[] = [];
    let matches: RegExpExecArray;
    while ((matches = re.exec(data)) !== null) {    
        teams.push(new GSTeam(matches[1], matches[3], +matches[4]));
    }
    return teams;
}

function pairUpTeams(teams: GSTeam[], pairStr: string[][]): GSTeam[] {
    for (let str of pairStr) {
        const pairing = str.map(s => teams.find(t => t.name.includes(s)));
        pairing[0].pairing = pairing[1];
        pairing[1].pairing = pairing[0];
    }
    return teams;
}

function fillGSPots(teams: GSTeam[]): GSTeam[][] {
    const pots = [[],[],[],[]];
    for (let i = 0; i < teams.length; ++i) {
        pots[i >> 4 << 1 | i % 2].push(teams[i]);
    }
    return pots;
}
/// <reference path="./../typings/tsd.d.ts"/>
//import request = require('request');
import Team from './team';
import { convertBadName } from './util';

if (!('Promise' in window) || !('fetch' in window)) {
    alert('The draw simulation only works in Chrome, Opera & Firefox.');
}
const Promise = window['Promise'];
const fetch = window['fetch'];

export default function (url: string) {
    const uriEncoded = encodeURIComponent(url);
    const teamsPromise = fetch(`https://proxy-antonv.rhcloud.com/?url=${uriEncoded}&encoding=latin1`)
        .then(response => response.text())
        .catch(err => fetch(`https://crossorigin.me/${url}`).then(r => r.text()).then(t => convertBadName(t)))
        .catch(err => alert('proxies are down'))
        .then(body => parseTeams(body));
    const pairingsPromise = fetch('json/pairings.json')
        .then(response => response.json());
    return Promise.all([teamsPromise, pairingsPromise])
        .then(results => pairUpTeams(results[0], results[1]))
        .then(teams => parsePots(teams))
        .catch(err => alert(err.message));
}

function parseTeams(data: string): Team[] {
    const re = /\s*(.+?)\s+(\*+\d?\s+)?(\w{3})\s+(\d{1,3}\.\d{3})/g;
    data = data.slice(data.indexOf('Pot 1'));
    const teams: Team[] = [];
    let matches: RegExpExecArray;
    while ((matches = re.exec(data)) !== null) {
        teams.push(new Team(matches[1], matches[3], parseFloat(matches[4])));
    }
    return teams;
}

function pairUpTeams(teams: Team[], pairStr: string[][]): Team[] {
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

function parsePots(teams: Team[]): Team[][] {
    const wildCards = ['Barcelona', 'Chelsea', 'Bayern', 'Juventus', 'Benfica', 'Paris', 'Zenit', 'PSV'];
    const pots = new Array<Team[]>(4);
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
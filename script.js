(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="./../typings/tsd.d.ts"/>
//import request = require('request');
var team_1 = require('./team');
if (!('Promise' in window) || !('fetch' in window)) {
    alert('The draw simulation only works in Chrome, Opera & Firefox.');
}
var Promise = window['Promise'];
var fetch = window['fetch'];
function default_1(url, groupStage) {
    if (groupStage === void 0) { groupStage = true; }
    return fetchPots(url).then(function (body) { return (groupStage ? parseGS : parseLast16Teams)(body); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function fetchPots(url) {
    return fetch("https://proxy-antonv.rhcloud.com/?url=" + encodeURIComponent(url) + "&encoding=latin1")
        .then(function (response) { return response.text(); })
        .catch(function (err) { return alert('proxies are down'); });
}
exports.fetchPots = fetchPots;
function parseGS(body) {
    var pairingsPromise = fetch('json/pairings.json')
        .then(function (response) { return response.json(); });
    var teams = parseGSTeams(body);
    return pairingsPromise
        .then(function (pairings) { return pairUpTeams(teams, pairings); })
        .then(function (teams) { return fillGSPots(teams); })
        .catch(function (err) { return alert(err.message); });
}
exports.parseGS = parseGS;
function parseLast16Teams(data) {
    data = data.slice(data.lastIndexOf('--------------'));
    var pots = [[], []];
    var re = /\s*(.+?)(\s\*+\d?\s+)?\s{2,}(\w{3})\s+/g;
    var matches;
    for (var i = 0; i < 16 && (matches = re.exec(data)) !== null; ++i) {
        pots[i % 2].push(new team_1.Last16Team(matches[1], matches[3], i >> 1));
    }
    return pots;
}
exports.parseLast16Teams = parseLast16Teams;
function parseGSTeams(data) {
    var re = /\s*(.+?)\s+(\*+\d?|\([CE]L-TH\))?\s+(\w{3})\s+(\d{1,3}\.\d{3})/g;
    data = data.slice(data.indexOf('Pot 1'));
    var teams = [];
    var matches;
    while ((matches = re.exec(data)) !== null) {
        teams.push(new team_1.GSTeam(matches[1], matches[3], +matches[4]));
    }
    return teams;
}
function pairUpTeams(teams, pairStr) {
    for (var _i = 0; _i < pairStr.length; _i++) {
        var str = pairStr[_i];
        var pairing = str.map(function (s) { return teams.find(function (t) { return t.name.includes(s); }); });
        pairing[0].pairing = pairing[1];
        pairing[1].pairing = pairing[0];
    }
    return teams;
}
function fillGSPots(teams) {
    var pots = [[], [], [], []];
    for (var i = 0; i < teams.length; ++i) {
        pots[i >> 4 << 1 | i % 2].push(teams[i]);
    }
    return pots;
}
},{"./team":6}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var possible_groups_1 = require('./possible-groups');
var util_1 = require('../util');
var visualizer_1 = require('../visualizer');
var GSDrawVisualizer = (function (_super) {
    __extends(GSDrawVisualizer, _super);
    function GSDrawVisualizer() {
        _super.apply(this, arguments);
    }
    GSDrawVisualizer.prototype.prepareDraw = function (pots) {
        var _this = this;
        var countryNamesPromise = window['fetch']('json/country-names.json').then(function (data) { return data.json(); });
        this.pots = pots.map(function (pot) { return pot.slice(); });
        this.groups = [];
        for (var i = 0; i < pots[0].length; ++i) {
            this.groups.push([]);
        }
        var tables = document.createElement('div');
        tables.id = 'tables-div';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        for (var i = 0; i < pots.length; ++i) {
            var pot = pots[i];
            var table = document.createElement('table');
            table.innerHTML = "<thead><tr><th>Pot " + (i + 1) + "</th></tr></thead><tbody></tbody>";
            var tBody = table.tBodies[0];
            for (var _i = 0; _i < pot.length; _i++) {
                var team = pot[_i];
                var cell = tBody.insertRow().insertCell();
                cell.textContent = team.name;
                if (team.pairing !== undefined) {
                    cell.title = 'paired with ' + team.pairing.name;
                }
            }
            this.potsDiv.appendChild(table);
        }
        countryNamesPromise.then(function (countries) {
            var numPotTables = _this.potsDiv.children.length;
            for (var i = 0; i < numPotTables; ++i) {
                var table = _this.potsDiv.children[i];
                var rows = table.tBodies[0].rows;
                for (var j = 0; j < rows.length; ++j) {
                    var countryCode = countries[pots[i][j].country.toLowerCase()].replace(' ', '-');
                    var img = "http://icons.iconarchive.com/icons/gosquared/flag/16/" + countryCode + "-flat-icon.png";
                    rows[j].cells[0].style.backgroundImage = "url(" + img + ")";
                }
            }
        });
        tables.appendChild(this.potsDiv);
        this.groupsDiv = document.createElement('div');
        this.groupsDiv.id = 'groups-div';
        var groupFrag = document.createDocumentFragment();
        for (var i = 0; i < pots[0].length; ++i) {
            var table = document.createElement('table');
            table.innerHTML = "<thead><tr><th>Group " + String.fromCharCode(65 + i) + "</th></tr></thead><tbody>" + '<tr><td/></tr>'.repeat(pots.length) + "</tbody>";
            groupFrag.appendChild(table);
        }
        this.groupsDiv.appendChild(groupFrag);
        tables.appendChild(this.groupsDiv);
        document.body.appendChild(tables);
        var bowls = document.createElement('div');
        bowls.id = 'bowls-div';
        this.teamBowl = document.createElement('div');
        this.teamBowl.id = 'team-bowl';
        this.teamBowl.classList.add('bowl');
        bowls.appendChild(this.teamBowl);
        this.announcement = document.createElement('div');
        this.announcement.id = 'announcement';
        bowls.appendChild(this.announcement);
        this.groupBowl = document.createElement('div');
        this.groupBowl.id = 'group-bowl';
        this.groupBowl.classList.add('bowl');
        bowls.appendChild(this.groupBowl);
        document.body.appendChild(bowls);
        this.currentPotNum = 0;
    };
    GSDrawVisualizer.prototype.runDraw = function () {
        if (this.currentPotNum > 0 || this.groups.some(function (g) { return g.length > 0; }) || this.pots.some(function (p) { return p.length < 8; })) {
            throw new Error('cannot start draw');
        }
        this.fillTeamBowl();
        _super.prototype.runDraw.call(this);
    };
    GSDrawVisualizer.prototype.fillTeamBowl = function () {
        var pot = this.pots[this.currentPotNum];
        for (var _i = 0, _a = util_1.shuffle(pot.map(function (el, i) { return i; })); _i < _a.length; _i++) {
            var i = _a[_i];
            var ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', this.onTeamBallPick.bind(this));
            this.teamBowl.appendChild(ball);
        }
    };
    GSDrawVisualizer.prototype.onTeamBallPick = function (ev) {
        this.teamBowl.classList.add('dont-touch');
        var ball = ev.target;
        ball.classList.add('ball-picked');
        var currentPot = this.pots[this.currentPotNum];
        var i = currentPot.findIndex(function (team) { return team.name === ball.textContent; });
        this.pickedTeam = currentPot.splice(i, 1)[0];
        var possibles = possible_groups_1.default(this.pots, this.groups, this.pickedTeam, this.currentPotNum);
        for (var _i = 0; _i < possibles.length; _i++) {
            var groupNum = possibles[_i];
            var possibleGroupCell = util_1.getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
            possibleGroupCell.classList.add('possible-group');
        }
        var potCell = util_1.getCell(this.potsDiv.children[this.currentPotNum], parseInt(ball.getAttribute('data-team')));
        potCell.classList.add('team-selected');
        var possiblesText = possibles.map(function (i) { return String.fromCharCode(65 + i); }).join(', ');
        this.announcement.textContent = "Possible groups for " + this.pickedTeam.name + ": " + possiblesText;
        this.fillGroupBowl(possibles);
    };
    GSDrawVisualizer.prototype.fillGroupBowl = function (possibleGroups) {
        for (var _i = 0, _a = util_1.shuffle(possibleGroups); _i < _a.length; _i++) {
            var groupNum = _a[_i];
            var ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = String.fromCharCode(65 + groupNum);
            ball.dataset['group'] = groupNum.toString();
            ball.addEventListener('click', this.onGroupBallPicked.bind(this));
            this.groupBowl.appendChild(ball);
        }
    };
    GSDrawVisualizer.prototype.onGroupBallPicked = function (ev) {
        var _this = this;
        var groupNum = +ev.target['dataset']['group'];
        this.groups[groupNum].push(this.pickedTeam);
        this.pickedTeam = null;
        var teamBall = this.teamBowl.querySelector('.ball-picked');
        this.teamBowl.removeChild(teamBall);
        var groupCell = util_1.getCell(this.groupsDiv.children[groupNum], this.currentPotNum);
        var potCell = util_1.getCell(this.potsDiv.children[this.currentPotNum], +teamBall.getAttribute('data-team'));
        potCell.classList.remove('team-selected');
        potCell.classList.add('greyed');
        util_1.animateContentTransfer(potCell, groupCell, 300).then(function () {
            groupCell.classList.remove('possible-group');
            groupCell.classList.add('team-emerge');
        });
        this.announcement.textContent = "Group " + String.fromCharCode(65 + groupNum) + "!";
        util_1.removeAllChildren(this.groupBowl);
        this.teamBowl.classList.remove('dont-touch');
        this.teamBowl.onclick = null;
        var groupTables = this.groupsDiv.children;
        for (var i = 0; i < groupTables.length; ++i) {
            if (i !== groupNum) {
                util_1.getCell(groupTables[i], this.currentPotNum).classList.remove('possible-group');
            }
        }
        if (this.pots[this.currentPotNum].length > 0)
            return;
        this.potsDiv.children[this.currentPotNum]['tHead'].classList.add('greyed');
        if (this.currentPotNum < 3) {
            ++this.currentPotNum;
            this.fillTeamBowl();
            this.announcement.textContent = 'Pick a ball';
        }
        else {
            var bowls = this.groupBowl.parentElement;
            bowls.removeChild(this.groupBowl);
            bowls.removeChild(this.teamBowl);
            this.announcement.innerHTML = 'Draw completed! ';
            var a = document.getElementById('restart').cloneNode(true);
            a.addEventListener('click', function (e) { return _this.restart(); });
            this.announcement.appendChild(a);
        }
    };
    return GSDrawVisualizer;
})(visualizer_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GSDrawVisualizer;
},{"../util":7,"../visualizer":8,"./possible-groups":3}],3:[function(require,module,exports){
function default_1(pots, groups, teamPicked, currentPotIndex) {
    console.log(teamPicked);
    if (groups.every(function (group) { return group.length === 0; })) {
        return groups.map(function (group, index) { return index; });
    }
    return filterGroupsBasic(groups, teamPicked, currentPotIndex).filter(function (groupNum) {
        groups[groupNum].push(teamPicked);
        var possible = groupIsPossible(pots, groups, currentPotIndex);
        groups[groupNum].pop();
        return possible;
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function groupIsPossible(pots, groups, currentPotIndex) {
    if (pots[currentPotIndex].length === 0 && ++currentPotIndex === pots.length) {
        return true;
    }
    var currentPot = pots[currentPotIndex];
    var team = currentPot.pop();
    var possible = false;
    for (var _i = 0, _a = filterGroupsBasic(groups, team, currentPotIndex); _i < _a.length; _i++) {
        var groupNum = _a[_i];
        var group = groups[groupNum];
        group.push(team);
        possible = groupIsPossible(pots, groups, currentPotIndex);
        group.pop();
        if (possible)
            break;
    }
    currentPot.push(team);
    return possible;
}
function filterGroupsBasic(groups, teamPicked, currentPotIndex) {
    var bottom = filterSomeGroups(groups, teamPicked, currentPotIndex, 0, groups.length >> 1);
    var top = filterSomeGroups(groups, teamPicked, currentPotIndex, groups.length >> 1, groups.length);
    return bottom.length === 0 ? top : top.length === 0 ? bottom : bottom.concat(top);
}
function filterSomeGroups(groups, teamPicked, currentPotIndex, start, end) {
    var possibles = [];
    var extraCondition = teamPicked.country === 'Rus' ?
        (function (otherTeam) { return otherTeam.country === 'Ukr'; }) : teamPicked.country === 'Ukr' ?
        (function (otherTeam) { return otherTeam.country === 'Rus'; }) : function (otherTeam) { return false; };
    for (var i = start; i < end; ++i) {
        var group = groups[i];
        var canDraw = true;
        for (var _i = 0; _i < group.length; _i++) {
            var team = group[_i];
            if (team.country === teamPicked.country || extraCondition(team)) {
                canDraw = false;
                if (team.pairing === teamPicked)
                    return [];
                break;
            }
        }
        if (canDraw && group.length <= currentPotIndex) {
            possibles.push(i);
        }
    }
    return possibles;
}
},{}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var last16_1 = require('./last16');
var util_1 = require('../util');
var visualizer_1 = require('../visualizer');
var Last16DrawVisualizer = (function (_super) {
    __extends(Last16DrawVisualizer, _super);
    function Last16DrawVisualizer() {
        _super.apply(this, arguments);
    }
    Last16DrawVisualizer.prototype.prepareDraw = function (pots) {
        var _this = this;
        var countryNamesPromise = window['fetch']('json/country-names.json').then(function (data) { return data.json(); });
        this.pots = pots.map(function (pot) { return pot.slice(); });
        this.matchups = [];
        for (var i = 0; i < pots[0].length; ++i) {
            this.matchups.push([]);
        }
        var tables = document.createElement('div');
        tables.id = 'tables-div';
        tables.style.width = '400px';
        tables.style.minWidth = '400px';
        this.potsDiv = document.createElement('div');
        this.potsDiv.id = 'pots-div';
        var potNames = ['Group winners', 'Runners-up'];
        for (var i = 0; i < pots.length; ++i) {
            var pot = pots[i];
            var table = document.createElement('table');
            table.innerHTML = "<thead><tr><th>" + potNames[i] + "</th></tr></thead><tbody></tbody>";
            var tBody = table.tBodies[0];
            for (var _i = 0; _i < pot.length; _i++) {
                var team = pot[_i];
                tBody.insertRow().insertCell().textContent = team.name;
            }
            this.potsDiv.appendChild(table);
        }
        countryNamesPromise.then(function (countries) {
            var potTables = _this.potsDiv.children;
            for (var i = 0; i < potTables.length; ++i) {
                var table = _this.potsDiv.children[i];
                var rows = table.tBodies[0].rows;
                for (var j = 0; j < rows.length; ++j) {
                    var countryCode = countries[pots[i][j].country.toLowerCase()].replace(' ', '-');
                    var img = "http://icons.iconarchive.com/icons/gosquared/flag/16/" + countryCode + "-flat-icon.png";
                    rows[j].cells[0].style.backgroundImage = "url(" + img + ")";
                }
            }
        });
        tables.appendChild(this.potsDiv);
        this.matchupDiv = document.createElement('div');
        //this.matchupDiv.id = 'groups-div';
        this.matchupDiv.innerHTML = "<table id=\"matchups\"><thead><tr><th colspan=\"3\">Matchups</th></tr></thead><tbody>" + '<tr><td/><td>v</td><td/></tr>'.repeat(pots[0].length) + "</tbody></table>";
        tables.appendChild(this.matchupDiv);
        document.body.appendChild(tables);
        var bowls = document.createElement('div');
        bowls.id = 'bowls-div';
        this.runnerUpBowl = document.createElement('div');
        this.runnerUpBowl.id = 'team-bowl';
        this.runnerUpBowl.classList.add('bowl');
        bowls.appendChild(this.runnerUpBowl);
        this.announcement = document.createElement('div');
        this.announcement.id = 'announcement';
        bowls.appendChild(this.announcement);
        this.groupWinnerBowl = document.createElement('div');
        this.groupWinnerBowl.id = 'group-bowl';
        this.groupWinnerBowl.classList.add('bowl');
        bowls.appendChild(this.groupWinnerBowl);
        document.body.appendChild(bowls);
        this.currentMatchupNum = 0;
    };
    Last16DrawVisualizer.prototype.runDraw = function () {
        if (this.currentMatchupNum > 0 || this.matchups.some(function (g) { return g.length > 0; }) || this.pots.some(function (p) { return p.length < 8; })) {
            console.log('current matchup', this.currentMatchupNum, 'matchups', this.matchups.map(function (m) { return m.length; }), 'pots', this.pots.map(function (m) { return m.length; }));
            throw new Error('cannot start draw');
        }
        this.fillBowl(1, this.pots[1].map(function (el, i) { return i; }));
        _super.prototype.runDraw.call(this);
    };
    Last16DrawVisualizer.prototype.fillBowl = function (potNumber, possibleOpponents) {
        var clickHandler = (potNumber === 1 ? this.onRunnerUpBallPick : this.onGroupWinnerBallPicked).bind(this), bowl = potNumber === 1 ? this.runnerUpBowl : this.groupWinnerBowl, pot = this.pots[potNumber], shuffledIndices = util_1.shuffle(possibleOpponents), frag = document.createDocumentFragment();
        for (var _i = 0; _i < shuffledIndices.length; _i++) {
            var i = shuffledIndices[_i];
            var ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = pot[i].name;
            ball.dataset['team'] = i.toString();
            ball.addEventListener('click', clickHandler);
            frag.appendChild(ball);
        }
        bowl.appendChild(frag);
        if (potNumber === 0 && possibleOpponents.length === 1) {
            setTimeout(function () { return bowl.firstElementChild.click(); }, 200);
        }
    };
    Last16DrawVisualizer.prototype.onRunnerUpBallPick = function (ev) {
        this.runnerUpBowl.classList.add('dont-touch');
        var ball = ev.target;
        ball.classList.add('ball-picked');
        var _a = this.pots, groupWinnerPot = _a[0], runnerUpPot = _a[1];
        var i = runnerUpPot.findIndex(function (team) { return team.name === ball.textContent; });
        var pickedTeam = runnerUpPot.splice(i, 1)[0];
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        // move cell
        var potCell = util_1.getCell(this.potsDiv.lastElementChild, +ball.getAttribute('data-team'));
        var matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[0];
        util_1.animateContentTransfer(potCell, matchupCell, 300).then(function () { return matchupCell.classList.add('team-emerge'); });
        potCell.classList.add('greyed');
        // find possible opponents for the team
        var possibles = last16_1.default(this.pots, this.matchups, this.currentMatchupNum);
        var possibleTeamNames = possibles.map(function (n) { return groupWinnerPot[n].name; });
        var groupWinnerRows = this.potsDiv.firstElementChild.tBodies[0].rows;
        for (var _i = 0, _b = [].map.call(groupWinnerRows, function (row) { return row.cells[0]; }); _i < _b.length; _i++) {
            var cell = _b[_i];
            if (possibleTeamNames.indexOf(cell.textContent) > -1) {
                cell.style.color = '#00f';
            }
        }
        var possiblesText = possibles.map(function (i) { return groupWinnerPot[i].name; }).join(', ');
        this.announcement.textContent = "Possible opponents for " + pickedTeam.name + ": " + possiblesText;
        // prepare the group winners bowl
        this.fillBowl(0, possibles);
        this.groupWinnerBowl.classList.remove('dont-touch');
    };
    Last16DrawVisualizer.prototype.onGroupWinnerBallPicked = function (ev) {
        var _this = this;
        this.groupWinnerBowl.classList.add('dont-touch');
        var _a = this.pots, groupWinnerPot = _a[0], runnerUpPot = _a[1];
        var ball = ev.target;
        var i = groupWinnerPot.findIndex(function (team) { return team.name === ball.textContent; });
        var pickedTeam = groupWinnerPot.splice(i, 1)[0];
        this.matchups[this.currentMatchupNum].push(pickedTeam);
        var cells = [].map.call(this.potsDiv.firstElementChild.tBodies[0].rows, function (row) { return row.cells[0]; });
        for (var _i = 0; _i < cells.length; _i++) {
            var c = cells[_i];
            c.style.color = null;
        }
        var potCell = cells.find(function (cell) { return cell.textContent === pickedTeam.name; });
        var matchupCell = this.matchupDiv.firstElementChild['tBodies'][0].rows[this.currentMatchupNum].cells[2];
        util_1.animateContentTransfer(potCell, matchupCell, 300).then(function () { return matchupCell.classList.add('team-emerge'); });
        potCell.classList.add('greyed');
        var teamBall = this.runnerUpBowl.querySelector('.ball-picked');
        this.runnerUpBowl.removeChild(teamBall);
        this.announcement.textContent = pickedTeam + '!';
        util_1.removeAllChildren(this.groupWinnerBowl);
        this.runnerUpBowl.classList.remove('dont-touch');
        this.runnerUpBowl.onclick = null;
        if (this.currentMatchupNum < 7) {
            ++this.currentMatchupNum;
            this.announcement.textContent = 'Pick a ball';
            if (runnerUpPot.length === 1) {
                setTimeout(function () { return _this.runnerUpBowl.firstElementChild.click(); }, 200);
            }
        }
        else {
            //this.potsDiv.children[this.currentMatchupNum]['tHead'].classList.add('greyed');
            var bowls = this.groupWinnerBowl.parentElement;
            bowls.removeChild(this.groupWinnerBowl);
            bowls.removeChild(this.runnerUpBowl);
            this.potsDiv.classList.add('greyed');
            this.announcement.innerHTML = 'Draw completed! ';
            var a = document.getElementById('restart').cloneNode(true);
            a.addEventListener('click', function (e) { return _this.restart(); });
            this.announcement.appendChild(a);
        }
    };
    return Last16DrawVisualizer;
})(visualizer_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Last16DrawVisualizer;
},{"../util":7,"../visualizer":8,"./last16":5}],5:[function(require,module,exports){
function default_1(pots, matchups, currentMatchupNum) {
    var groupWinners = pots[0], runnersUp = pots[1];
    function anyGroupWinners(branchNum, currentMatchupNum) {
        var currentMatchup = matchups[currentMatchupNum];
        var currentlyPicked = currentMatchup[0];
        var o = groupWinners[branchNum];
        if (o.country === currentlyPicked.country || o.group === currentlyPicked.group)
            return false;
        groupWinners.splice(branchNum, 1);
        currentMatchup.push(o);
        var hasDescendants = ++currentMatchupNum === matchups.length || anyRunnersUp(matchups, currentMatchupNum);
        currentMatchup.pop();
        groupWinners.splice(branchNum, 0, o);
        return hasDescendants;
    }
    function anyRunnersUp(virtualMatchups, virtualMatchupNum) {
        var virtualMatchup = virtualMatchups[virtualMatchupNum];
        var groupWinnersIndices = groupWinners.map(function (team, i) { return i; });
        return runnersUp.some(function (ru, ruIndex) {
            var virtualPicked = runnersUp.splice(ruIndex, 1)[0];
            virtualMatchup.push(virtualPicked);
            var hasAnyDescendants = groupWinnersIndices.some(function (j) { return anyGroupWinners(j, virtualMatchupNum); });
            virtualMatchup.pop();
            runnersUp.splice(ruIndex, 0, virtualPicked);
            return hasAnyDescendants;
        });
    }
    return groupWinners
        .map(function (team, i) { return i; })
        .filter(function (i) { return anyGroupWinners(i, currentMatchupNum); });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
},{}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Team = (function () {
    function Team(name, country) {
        this.name = name;
        this.country = country;
    }
    return Team;
})();
exports.Team = Team;
var GSTeam = (function (_super) {
    __extends(GSTeam, _super);
    function GSTeam(name, country, coefficient, pairing) {
        _super.call(this, name, country);
        this.coefficient = coefficient;
        this.pairing = pairing;
    }
    return GSTeam;
})(Team);
exports.GSTeam = GSTeam;
var Last16Team = (function (_super) {
    __extends(Last16Team, _super);
    function Last16Team(name, country, group) {
        _super.call(this, name, country);
        this.group = group;
    }
    return Last16Team;
})(Team);
exports.Last16Team = Last16Team;
},{}],7:[function(require,module,exports){
/// <reference path="./../typings/tsd.d.ts"/>
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
        ;
    return o;
}
exports.shuffle = shuffle;
function getCell(table, n) {
    return table['tBodies'][0].rows[n].cells[0];
}
exports.getCell = getCell;
function removeAllChildren(el) {
    var child;
    while (child = el.firstChild) {
        el.removeChild(child);
    }
}
exports.removeAllChildren = removeAllChildren;
function animateContentTransfer(sourceCell, targetCell, duration) {
    return new Promise(function (resolve) {
        var targetCellStyle = targetCell.style;
        targetCellStyle.fontSize = '0px';
        targetCell.textContent = sourceCell.textContent;
        var fakeCell = document.createElement('td');
        var fakeCellStyle = fakeCell.style;
        fakeCellStyle.opacity = null;
        fakeCellStyle.position = 'absolute';
        fakeCellStyle.backgroundRepeat = 'no-repeat';
        fakeCell.textContent = sourceCell.textContent;
        var computedStyle = getComputedStyle(sourceCell);
        for (var _i = 0, _a = ['width', 'border', 'padding', 'padding-left', 'background-position', 'background-image']; _i < _a.length; _i++) {
            var s = _a[_i];
            fakeCellStyle[s] = computedStyle[s];
        }
        var sourceCellBox = sourceCell.getBoundingClientRect();
        fakeCellStyle.transform = "translate(" + sourceCellBox.left + "px, " + sourceCellBox.top + "px)";
        fakeCellStyle.height = sourceCellBox.height - 5 + 'px';
        fakeCellStyle.borderColor = 'rgba(0,0,0,0)';
        fakeCellStyle.paddingTop = '3px';
        fakeCellStyle.backgroundColor = null;
        document.body.appendChild(fakeCell);
        var targetCellBox = targetCell.getBoundingClientRect();
        fakeCellStyle.transition = "transform " + duration + "ms ease-in-out";
        fakeCellStyle.transform = "translate3d(" + targetCellBox.left + "px, " + targetCellBox.top + "px, 0px)";
        fakeCell.addEventListener('transitionend', function (e) {
            document.body.removeChild(fakeCell);
            targetCellStyle.fontSize = null;
            targetCellStyle.backgroundImage = sourceCell.style.backgroundImage;
            resolve();
        });
    });
}
exports.animateContentTransfer = animateContentTransfer;
},{}],8:[function(require,module,exports){
var Visualizer = (function () {
    function Visualizer(pots) {
        this.initialPots = pots;
        this.prepareDraw(pots);
    }
    Visualizer.prototype.prepareDraw = function (pots) { };
    Visualizer.prototype.runDraw = function () {
        this.announcement.textContent = 'Pick a ball';
    };
    Visualizer.prototype.restart = function () {
        document.body.removeChild(document.getElementById('tables-div'));
        document.body.removeChild(document.getElementById('bowls-div'));
        this.prepareDraw(this.initialPots);
        this.runDraw();
    };
    return Visualizer;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Visualizer;
},{}],9:[function(require,module,exports){
var fetch_parse_pots_1 = require('./fetch-parse-pots');
var draw_visualizer_1 = require('./gs/draw-visualizer');
var draw_visualizer_2 = require('./last16/draw-visualizer');
var fetched = fetch_parse_pots_1.fetchPots('http://kassiesa.home.xs4all.nl/bert/uefa/seedcl2016.html');
var modes = [
    { url: 'gs', name: 'Group stage draw' },
    { url: 'last16', name: 'Last 16 draw', disabled: true }
];
var currentMode = window.location.search.endsWith('mode=last16') ? 1 : 0;
function checkMode() {
    console.log(modes[currentMode]);
    if (modes[currentMode]['disabled']) {
        alert("mode " + modes[currentMode--].name + " not available yet");
    }
}
function visualize(pots) {
    return new (currentMode === 1 ? draw_visualizer_2.default : draw_visualizer_1.default)(pots);
}
function start() {
    checkMode();
    window.history.pushState({}, '', '?mode=' + modes[currentMode].url);
    changeModeLink.textContent = 'Go to ' + modes[1 - currentMode].name;
    var parse = currentMode === 1 ? fetch_parse_pots_1.parseLast16Teams : fetch_parse_pots_1.parseGS;
    fetched.then(parse).then(visualize).then(function (vis) { return vis.restart(); });
}
function restart(changeMode) {
    document.body.removeChild(document.getElementById('tables-div'));
    document.body.removeChild(document.getElementById('bowls-div'));
    window.getSelection().empty();
    if (changeMode && ++currentMode >= modes.length)
        currentMode = 0;
    checkMode();
    start();
}
document.getElementById('restart').addEventListener('click', function (e) { return restart(false); });
var changeModeLink = document.getElementById('change-mode');
changeModeLink.addEventListener('click', function (e) { return restart(true); });
start();
},{"./fetch-parse-pots":1,"./gs/draw-visualizer":2,"./last16/draw-visualizer":4}],10:[function(require,module,exports){

},{}]},{},[10,9]);

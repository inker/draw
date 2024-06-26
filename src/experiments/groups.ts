import { chunk, pull, range, shuffle } from 'lodash';

import { findFirstSolution } from '#utils/backtrack.js';

const teams = range(36).map(i => ({ id: i + 1 }));
const numPots = 4;

type Team = (typeof teams)[number];

const pots = chunk(teams, teams.length / numPots);

const pairedPots: Record<`${number}:${number}`, [Team[], Team[]]> = {};

const totalMatches = teams.length * numPots;

for (let i = 0; i < pots.length; ++i) {
  for (let j = 0; j < pots.length; ++j) {
    pairedPots[`${i}:${j}`] = [pots[i], pots[j]];
  }
}

const resultingMatches: [Team, Team][] = [];

while (true) {
  for (let i = 0; i < pots.length; ++i) {
    for (let j = 0; j < pots.length; ++j) {
      const [remainingHomePot, remainingAwayPot] = pairedPots[`${i}:${j}`];
      let isHomeBeingPicked = true;
      while (remainingHomePot.length > 0 || remainingAwayPot.length > 0) {
        const potToPickFrom = isHomeBeingPicked
          ? remainingHomePot
          : remainingAwayPot;

        // eslint-disable-next-line no-loop-func
        const pickedTeam = potToPickFrom.find(team => {
          const solution = findFirstSolution(
            {
              pairedPots,
              matches: resultingMatches,
              picked: team,
              currentHomePot: i,
              currentAwayPot: j,
              isHomeBeingPicked,
            },
            {
              // eslint-disable-next-line arrow-body-style
              reject: c => {
                return false;
              },
              accept: c => c.matches.length === totalMatches - 1,
              generate: c => {
                const newPotPair = [
                  ...c.pairedPots[`${c.currentHomePot}:${c.currentAwayPot}`],
                ] as [Team[], Team[]];
                const index = c.isHomeBeingPicked ? 0 : 1;
                newPotPair[index] = [...newPotPair[index]].filter(
                  item => item !== c.picked,
                );

                const newPairedPots = {
                  ...c.pairedPots,
                  [`${c.currentHomePot}:${c.currentAwayPot}`]: newPotPair,
                } as typeof c.pairedPots;

                const newMatches = [...c.matches];
                if (c.isHomeBeingPicked) {
                  newMatches.push([c.picked] as unknown as [Team, Team]);
                } else {
                  newMatches[newMatches.length - 1] = [
                    newMatches.at(-1)![0],
                    c.picked,
                  ];
                }

                const newIsHomeBeingPicked = !c.isHomeBeingPicked

                if ()
              },
            },
          );

          return solution !== undefined;
        });

        isHomeBeingPicked = !isHomeBeingPicked;
      }
    }
  }
}

console.log('resulting matches', resultingMatches);

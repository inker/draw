import generatePairings from './generatePairings';
import pots from './pots';

const NUM_MATCHDAYS = 8;

type Team = (typeof pots)[number][number];

function canPlay(a: Team, b: Team) {
  return a.country !== b.country;
}

(async () => {
  // const matchdays = await generatePairings({
  //   pots,
  //   numMatchdays: NUM_MATCHDAYS,
  //   isMatchPossible: canPlay,
  // });
  console.log(
    'final',
    matchdays.map(m => [m[0].name, m[1].name]),
  );
})();

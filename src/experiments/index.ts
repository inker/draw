import { range } from 'lodash';

import generateMatchdays from './generatePairings';

const matchdays = generateMatchdays({
  teams: range(36),
  numPots: 4,
  numMatchdays: 8,
  maxHomeGamesVsPot: 1,
});
console.log('final', matchdays);

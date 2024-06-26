import { range, stubTrue } from 'lodash';

import generatePairings from './generatePairings';

const matchdays = generatePairings({
  teams: range(36),
  numPots: 4,
  numMatchdays: 8,
  canPlay: stubTrue,
});
console.log('final', matchdays);

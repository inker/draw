import { range, stubTrue } from 'lodash';

import generateMatchdays from './generatePairings';

const matchdays = generateMatchdays({
  teams: range(36),
  numPots: 4,
  numMatchdays: 8,
  canPlay: stubTrue,
});
console.log('final', matchdays);

import { type UefaCountry } from '#model/types';

const coldCountries: UefaCountry[] = [
  'Belarus',
  'Estonia',
  'Faroe Islands',
  'Finland',
  'Iceland',
  'Kazakhstan',
  'Latvia',
  'Lithuania',
  'Norway',
  'Russia',
  'Sweden',
];

const coldCountriesSet = new Set(coldCountries);

// Clubs whose roofed stadiums have let them host the last matchday,
// by the first season they played there.
export const firstSeasonUnderRoofByClub = new Map([
  ['Zenit', 2017],
  ['Djurgården', 2013],
]);

interface Club {
  readonly name: string;
  readonly country: UefaCountry;
}

export default (season: number) => (team: Club) => {
  const firstSeasonUnderRoof = firstSeasonUnderRoofByClub.get(team.name);
  return (
    coldCountriesSet.has(team.country) &&
    (firstSeasonUnderRoof === undefined || season < firstSeasonUnderRoof)
  );
};

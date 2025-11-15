import { chunk } from 'lodash';

import countries from '#data/countries';
import NationalTeam from '#model/team/NationalTeam';
import UnknownNationalTeam from '#model/team/UnknownNationalTeam';

const makeNationalTeam = (
  name: string,
  isHost: boolean,
  forcedGroupIndex?: number,
) => {
  const ctr = countries[name as keyof typeof countries];
  return ctr
    ? new NationalTeam(name, 0, ctr.confederation, isHost, forcedGroupIndex)
    : // @ts-expect-error
      new UnknownNationalTeam(name, 0, name.split('/'));
};

export default (
  hosts: readonly string[],
  rest: readonly string[],
  season: number,
  forcedGroupMap: Record<string, number>,
  // eslint-disable-next-line max-params
) => {
  const teams = [
    ...hosts.map(name => makeNationalTeam(name, true, forcedGroupMap[name])),
    ...rest.map(name => makeNationalTeam(name, false, forcedGroupMap[name])),
  ];
  return chunk(teams, season < 2026 ? 8 : 12);
};

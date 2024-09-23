import { type UefaCountry } from '#model/types';

import Club from './Club';

export default class KnockoutTeam extends Club {
  readonly group: number;

  // eslint-disable-next-line max-params
  constructor(
    name: string,
    country: UefaCountry,
    group: number,
    shortName?: string,
  ) {
    super(name, country, shortName);
    this.group = group;
  }
}

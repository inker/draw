import { type Confederation } from '#model/types';

import Team from '.';

export default class NationalTeam extends Team {
  readonly coefficient: number;
  readonly confederation: Confederation;
  readonly host: boolean;
  readonly forcedGroupIndex?: number;

  // eslint-disable-next-line max-params
  constructor(
    name: string,
    coefficient: number,
    confederation: Confederation,
    host: boolean,
    forcedGroupIndex?: number,
  ) {
    super(name);
    this.coefficient = coefficient;
    this.confederation = confederation;
    this.host = host;
    this.forcedGroupIndex = forcedGroupIndex;
  }
}

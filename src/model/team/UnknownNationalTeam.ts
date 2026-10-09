import { type Confederation } from '#model/types';

import Team from '.';

export default class UnknownNationalTeam extends Team {
  readonly coefficient: number;
  readonly confederations: ReadonlySet<Confederation>;

  constructor(
    name: string,
    coefficient: number,
    confederations: Iterable<Confederation>,
  ) {
    super(name);
    this.coefficient = coefficient;
    this.confederations = new Set(confederations);
  }
}

import { uniqueId } from 'lodash';

export default class Team {
  readonly id = uniqueId('team-');
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}

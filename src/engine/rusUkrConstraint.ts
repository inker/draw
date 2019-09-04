import { stubFalse } from 'lodash'

import Team from 'model/team/Club'

const RUSSIA = 'Russia'
const UKRAINE = 'Ukraine'

const pickedRu = (otherTeam: Team) => otherTeam.country === UKRAINE
const pickedUa = (otherTeam: Team) => otherTeam.country === RUSSIA

const stubStubFalse = () => stubFalse

const isRusUkr = (teamPicked: Team) =>
  teamPicked.country === RUSSIA
    ? pickedRu
    : teamPicked.country === UKRAINE
      ? pickedUa
      : stubFalse

const isWarSeason = (season: number) => season >= 2014

export default (season: number) =>
  isWarSeason(season)
    ? isRusUkr
    : stubStubFalse

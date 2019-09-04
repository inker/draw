import { allPossibleGroups } from '@draws/engine'

import getPredicate from 'engine/predicates/gs'
import Team from 'model/team/GSTeam'
import { WorkerData } from 'model/types'

addEventListener('message', e => {
  const {
    messageId,
    data: {
      season,
      pots,
      groups,
      selectedTeam,
    },
  } = e.data as WorkerData<Team>

  const predicate = getPredicate(season)
  const possibleGroups = allPossibleGroups(pots, groups, selectedTeam, predicate)

  postMessage({
    messageId,
    data: {
      possibleGroups,
    },
  })
})

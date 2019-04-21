import { useCallback } from 'react'
import delay from 'delay.js'

import Team from 'model/team'

import useLongCalculatingReducer, {
  types as longCalculatingTypes,
} from 'pages/useLongCalculatingReducer'

type ReturnType = [
  boolean,
  (oldSelectedTeam: any) => Promise<void>,
  () => void,
]

export default (delayMs: number): ReturnType => {
  const [longCalculating, dispatchLongCalculating] = useLongCalculatingReducer()

  const runCalculatingTimer = useCallback(async (oldSelectedTeam: Team) => {
    dispatchLongCalculating({
      type: longCalculatingTypes.set,
      payload: oldSelectedTeam,
    })
    await delay(delayMs)
    dispatchLongCalculating({
      type: longCalculatingTypes.set,
      payload: oldSelectedTeam,
    })
  }, [])

  const resetLongCalculating = useCallback(() => {
    dispatchLongCalculating({
      type: longCalculatingTypes.reset,
    })
  }, [])

  return [longCalculating.isLong, runCalculatingTimer, resetLongCalculating]
}

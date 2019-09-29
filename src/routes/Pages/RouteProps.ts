import { RouteComponentProps } from 'react-router-dom'

interface Match {
  tournament: string,
  stage: string,
  season: string,
}

export type RouteProps = RouteComponentProps<Match>

export default RouteProps

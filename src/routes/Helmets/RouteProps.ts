import { RouteComponentProps } from 'react-router-dom'

interface Match {
  tournament: string,
}

type RouteProps = RouteComponentProps<Match>

export default RouteProps

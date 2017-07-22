import * as React from 'react'
import { Route as BaseRoute } from 'react-router-dom'

const base = location.host.includes('github') ? '/draw' : ''

const Route = ({ path, ...props }) => (
  <BaseRoute
    {...props}
    path={`${base}${path}`}
  />
)

export default Route

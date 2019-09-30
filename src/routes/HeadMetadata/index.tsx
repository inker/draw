import React from 'react'
import { Route } from 'react-router-dom'

import Head from './Head'

const HeadMetadata = () => (
  <Route
    path="/:tournament"
    component={Head}
  />
)

export default HeadMetadata

import React from 'react'
import {
    Route,
    Redirect,
    IndexRoute,
    IndexRedirect,
} from 'react-router'

import {
    GS,
    Last16,
} from './components/cl'

export default () => (
    <Route path="/">
        <IndexRedirect to="cl" />
        <Route path="cl">
            <IndexRedirect to="last16" />
            <Route path="gs" component={GS} />
            <Route path="last16" component={Last16} />
        </Route>
    </Route>
)

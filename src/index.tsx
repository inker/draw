import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
import {
  applyRouterMiddleware,
  browserHistory,
  Router,
} from 'react-router'

import createRoutes from './routes'

import 'whatwg-fetch'

const chooseOther = () => {
    const { pathname } = location
    return pathname === '/cl/last16' ? '/cl/gs' : pathname === '/cl/gs' ? '/cl/last16' : '/'
}

ReactDom.render(
    <div>
        <Router history={browserHistory}>
            createRoutes()
        </Router>
        <div id="links">
            <a href={location.pathname}>Restart</a> |
            <a href={chooseOther()}>Change mode</a>
            <a
                className="github-button"
                href="https://github.com/inker/cl-draw"
                data-icon="octicon-star"
                data-count-href="/inker/cl-draw/stargazers"
                data-count-api="/repos/inker/cl-draw#stargazers_count"
                data-count-aria-label="# stargazers on GitHub"
                aria-label="Star inker/cl-draw on GitHub"
            >Star</a>
        </div>
    </div>,
    document.getElementById('app'),
)

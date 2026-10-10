import { createBrowserHistory, parseHref } from '@tanstack/history';

// Not createHashHistory, which appends the page's own query to the one in the hash,
// so `?fbclid=x#/cl/gs/2004?seed=...` reads the seed as `...?fbclid=x`
export default createBrowserHistory({
  parseLocation: () =>
    parseHref(window.location.hash.slice(1) || '/', window.history.state),
  createHref: href =>
    `${window.location.pathname}${window.location.search}#${href}`,
});

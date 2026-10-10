import {
  createRootRoute,
  createRoute,
  createRouter,
  parseSearchWith,
  redirect,
  stringifySearchWith,
} from '@tanstack/react-router';
import {
  // As `z.catch`, promise/valid-params takes it for Promise#catch
  catch as withFallback,
  z,
} from 'zod/mini';

import resolveDrawRoute from '#model/resolveDrawRoute';
import availability from '#data/availability';

import routerHistory from './history';
import Routing from './Routing';

const rootRoute = createRootRoute();

const drawRoute = createRoute({
  path: '{-$tournament}/{-$stage}/{-$season}',
  component: Routing,
  getParentRoute: () => rootRoute,
  params: {
    parse: ({ tournament, stage, season }) => {
      const parsedSeason = Number(season);
      return (
        resolveDrawRoute(availability, {
          tournament,
          stage,
          season: Number.isFinite(parsedSeason) ? parsedSeason : undefined,
        }) ?? false
      );
    },
    stringify: ({ season, ...rest }) => ({
      ...rest,
      season: String(season),
    }),
  },
  // Everything that is not a draw that exists - an old link, a hand-typed URL,
  // a combination one of the selects cannot express - lands on the nearest one that does
  beforeLoad: ({ location, params, buildLocation }) => {
    const nearest = buildLocation({
      to: '/{-$tournament}/{-$stage}/{-$season}',
      params,
    });
    if (location.pathname !== nearest.pathname) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        href: nearest.href,
        replace: true,
      });
    }
  },
  validateSearch: withFallback(
    z.object({
      seed: withFallback(z.optional(z.string()), undefined),
    }),
    {},
  ),
});

const routeTree = rootRoute.addChildren([drawRoute]);

const router = createRouter({
  history: routerHistory,
  routeTree,
  // The default JSON-parses every value,
  // which would turn an all-digit seed into a number & drop its leading zeros
  parseSearch: parseSearchWith(value => value),
  stringifySearch: stringifySearchWith(JSON.stringify),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default router;

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
import { validTournaments } from '#model/Tournament';
import { validStages } from '#model/Stage';
import { stageToSlot } from '#model/DrawSlot';
import availability from '#data/availability';

import config from '../config';

import routerHistory from './history';
import NotFound from './NotFound';
import Routing from './Routing';
import Pages from './Pages';
import LoadError from './Pages/LoadError';
import loadDraw from './Pages/loadDraw';

const rootRoute = createRootRoute({
  notFoundComponent: NotFound,
});

const rawParamsSchema = z.object({
  tournament: withFallback(z.enum(validTournaments), config.defaultTournament),
  stage: withFallback(z.optional(z.enum(validStages)), undefined),
  season: withFallback(z.optional(z.coerce.number()), undefined),
});

const drawRoute = createRoute({
  path: '{-$tournament}/{-$stage}/{-$season}',
  component: Routing,
  getParentRoute: () => rootRoute,
  params: {
    parse: raw => {
      const { tournament, stage, season } = rawParamsSchema.parse(raw);
      return (
        resolveDrawRoute(availability, {
          tournament,
          slot: stage ? stageToSlot(stage) : 'main',
          season,
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

const pageRoute = createRoute({
  path: '/',
  component: Pages,
  errorComponent: LoadError,
  getParentRoute: () => drawRoute,
  // A new draw starts from scratch rather than carrying over the last one's state
  remountDeps: ({ params }) => params,
  loader: ({ params }) => loadDraw(params),
  onError: err => {
    console.error(err);
  },
  // The data never changes,
  // but leaving a draw drops it so coming back loads it again,
  // which is what turns fast mode off
  staleTime: Infinity,
  gcTime: 0,
});

const routeTree = rootRoute.addChildren([drawRoute.addChildren([pageRoute])]);

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

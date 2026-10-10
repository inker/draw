import { memo, startTransition, useCallback, useOptimistic } from 'react';
import { Outlet } from '@tanstack/react-router';

import resolveDrawRoute, {
  type RequestedDrawRoute,
} from '#model/resolveDrawRoute';
import { stageToSlot } from '#model/DrawSlot';
import availability from '#data/availability';

import HeadMetadata from './HeadMetadata';
import Navbar from './Navbar';
import { drawRouteApi } from './routeApi';

function Routing() {
  const navigate = drawRouteApi.useNavigate();
  const route = drawRouteApi.useParams();

  // The router keeps showing the draw being left until the next one has loaded,
  // so without this the selects would jump back to it in the meantime
  const [shownRoute, setShownRoute] = useOptimistic(route);

  const onChange = useCallback(
    (change: Partial<RequestedDrawRoute>) => {
      const next = resolveDrawRoute(availability, {
        tournament: shownRoute.tournament,
        slot: stageToSlot(shownRoute.stage),
        season: shownRoute.season,
        ...change,
      });

      if (next) {
        startTransition(async () => {
          setShownRoute(next);
          await navigate({
            to: '.',
            params: next,
          });
        });
      }
    },
    [shownRoute, setShownRoute, navigate],
  );

  return (
    <>
      <HeadMetadata />
      <Navbar
        route={shownRoute}
        onChange={onChange}
      />
      <Outlet />
    </>
  );
}

export default memo(Routing);

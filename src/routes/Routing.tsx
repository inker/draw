import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useOptimistic,
} from 'react';
import { Outlet, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';

import resolveDrawRoute, {
  type RequestedDrawRoute,
} from '#model/resolveDrawRoute';
import { stageToSlot } from '#model/DrawSlot';
import availability from '#data/availability';
import usePopup from '#store/usePopup';

import HeadMetadata from './HeadMetadata';
import Navbar from './Navbar';
import { drawRouteApi } from './routeApi';

function Routing() {
  const navigate = drawRouteApi.useNavigate();
  const route = drawRouteApi.useParams();

  const isLoading = useRouterState({
    select: state => state.isLoading,
  });

  // The router keeps showing the draw being left until the next one has loaded,
  // so without this the selects would jump back to it in the meantime
  const [shownRoute, setShownRoute] = useOptimistic(route);

  const [popup, setPopup] = usePopup();

  useEffect(() => {
    setPopup({
      waiting: isLoading,
    });
  }, [isLoading, setPopup]);

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
        className={clsx(popup.initial && 'v-hidden')}
        route={shownRoute}
        onChange={onChange}
      />
      <Outlet />
    </>
  );
}

export default memo(Routing);

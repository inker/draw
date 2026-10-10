import { memo, useCallback } from 'react';
import clsx from 'clsx';

import resolveDrawRoute, {
  type RequestedDrawRoute,
} from '#model/resolveDrawRoute';
import { stageToSlot } from '#model/DrawSlot';
import availability from '#data/availability';
import usePopup from '#store/usePopup';

import HeadMetadata from './HeadMetadata';
import Navbar from './Navbar';
import Pages from './Pages';
import drawRouteApi from './routeApi';

function Routing() {
  const navigate = drawRouteApi.useNavigate();
  const route = drawRouteApi.useParams();

  const [popup] = usePopup();

  const onChange = useCallback(
    (change: Partial<RequestedDrawRoute>) => {
      const next = resolveDrawRoute(availability, {
        tournament: route.tournament,
        slot: stageToSlot(route.stage),
        season: route.season,
        ...change,
      });

      if (next) {
        navigate({
          to: '.',
          params: next,
        });
      }
    },
    [route, navigate],
  );

  return (
    <>
      <HeadMetadata />
      <Navbar
        className={clsx(popup.initial && 'v-hidden')}
        route={route}
        onChange={onChange}
      />
      <Pages route={route} />
    </>
  );
}

export default memo(Routing);

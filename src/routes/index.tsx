import { memo, useCallback, useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import resolveDrawRoute, {
  type DrawRoute,
  type RequestedDrawRoute,
} from '#model/resolveDrawRoute';
import availability from '#data/availability';
import usePopup from '#store/usePopup';

import HeadMetadata from './HeadMetadata';
import Navbar from './Navbar';
import Pages from './Pages';

const toPath = ({ tournament, stage, season }: DrawRoute) =>
  `/${tournament}/${stage}/${season}`;

const parsePath = (pathname: string): RequestedDrawRoute => {
  const [tournament, stage, season] = pathname.split('/').filter(Boolean);
  const parsedSeason = Number(season);

  return {
    tournament,
    stage,
    season: Number.isFinite(parsedSeason) ? parsedSeason : undefined,
  };
};

function Routing() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [popup] = usePopup();

  const route = useMemo(
    () => resolveDrawRoute(availability, parsePath(pathname)),
    [pathname],
  );

  const onChange = useCallback(
    (change: RequestedDrawRoute) => {
      const next = resolveDrawRoute(availability, {
        ...route,
        ...change,
      });

      if (next) {
        navigate(toPath(next));
      }
    },
    [route, navigate],
  );

  if (!route) {
    return null;
  }

  const path = toPath(route);

  // Everything that is not a draw that exists - an old link, a hand-typed URL,
  // a combination one of the selects cannot express - lands on the nearest one that does
  if (pathname !== path) {
    return (
      <Navigate
        to={path}
        replace
      />
    );
  }

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

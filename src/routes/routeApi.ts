import { getRouteApi } from '@tanstack/react-router';

export const drawRouteApi = getRouteApi('/{-$tournament}/{-$stage}/{-$season}');

export const pageRouteApi = getRouteApi(
  '/{-$tournament}/{-$stage}/{-$season}/',
);

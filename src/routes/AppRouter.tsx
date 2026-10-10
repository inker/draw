import { memo } from 'react';
import { RouterProvider, useRouterState } from '@tanstack/react-router';

import Popup from '../Popup';

import router from './router';

// Outside the provider, because nothing inside it renders until the first draw has loaded
function AppRouter() {
  const isInitial = useRouterState({
    router,
    select: state => !state.resolvedLocation,
  });
  const isLoading = useRouterState({
    router,
    select: state => state.isLoading,
  });

  return (
    <>
      <Popup
        initial={isInitial}
        waiting={isInitial || isLoading}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default memo(AppRouter);

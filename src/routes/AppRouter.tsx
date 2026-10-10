import { memo } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import router from './router';

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default memo(AppRouter);

import { memo } from 'react';
import { Navigate } from '@tanstack/react-router';

function NotFound() {
  return (
    <Navigate
      to="/"
      replace
    />
  );
}

export default memo(NotFound);

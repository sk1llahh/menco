import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { sessionManager } from '@/shared/model/session';

export function ProtectedRoute() {
  const location = useLocation();

  if (!sessionManager.session) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  return <Outlet />;
}

export function ProtectedLoader(params) {
  const token = sessionManager.token;

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

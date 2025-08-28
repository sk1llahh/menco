import { Navigate, Outlet, useLocation } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { sessionManager } from '@/shared/model/session';

export function AuthRoute() {
  const location = useLocation();

  if (sessionManager.session) {
    return <Navigate to={ROUTES.MAIN} state={{ from: location }} />;
  }

  return <Outlet />;
}

export function AuthLoader() {
  const token = sessionManager.token;

  if (token) {
    return <Navigate to={ROUTES.MAIN} />;
  }

  return <Outlet />;
}

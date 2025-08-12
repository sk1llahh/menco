import { Navigate, Outlet } from "react-router";
import { ROUTES } from "@/shared/model/routes.ts";
import { sessionManager } from "@/shared/model/session.ts";

export function ProtectedRoute() {
  if (!sessionManager.session) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export function protectedLoader(){
  const token = sessionManager.token

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}
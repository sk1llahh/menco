import { ROUTES } from "@/shared/model/routes";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    lazy: () => import("@/pages/auth/login.page"),
  },
    {
    path: ROUTES.REGISTER,
    lazy: () => import("@/pages/auth/register.page")
  },
]);

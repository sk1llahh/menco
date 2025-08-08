import {createBrowserRouter} from "react-router";
import {Providers} from "@/app/providers.tsx";
import App from "@/app/App.tsx";
import {protectedLoader, ProtectedRoute} from "@/app/protected-route.tsx";
import {ROUTES} from "@/shared/model/routes.ts";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <ProtectedRoute />
        ),
        children: [
          {
            path: ROUTES.PROFILE,
            lazy: () => import("@/pages/profile/profile.page")
          },
        ]
      },

      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/pages/auth/login.page")
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/pages/auth/register.page")
      },
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/main/main.page")
      },
    ]
  }
]);

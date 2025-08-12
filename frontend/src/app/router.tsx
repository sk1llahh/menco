import {createBrowserRouter} from "react-router";
import {Providers} from "@/app/providers.tsx";
import App from "@/app/App.tsx";
import {protectedLoader, ProtectedRoute} from "@/app/protected-route.tsx";
import {ROUTES} from "@/shared/model/routes.ts";
import {LayoutSidebar} from "@/widgets/layout-sidebar";

const protectedArray = [
  {
    loader: protectedLoader,
    element: (
      <ProtectedRoute/>
    ),
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/pages/home/home.page")
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import("@/pages/profile/profile.page")
      },
      {
        path: ROUTES.KNOWLEDGE_BASE,
        lazy: () => import("@/pages/knowledge_base/knowledge_base.page")
      },
      {
        path: ROUTES.SEARCH,
        lazy: () => import("@/pages/search/search.page")
      },
      {
        path: ROUTES.SCHEDULE,
        lazy: () => import("@/pages/schedule/schedule.page")
      },
    ]
  }
]

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App/>
      </Providers>
    ),
    children: [
      {
        element: (
          <LayoutSidebar/>
        ),
        children: protectedArray
      },
      {
        path: ROUTES.MAIN,
        lazy: () => import("@/pages/main/main.page")
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/pages/auth/login.page")
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/pages/auth/register.page")
      },

    ]
  }
]);

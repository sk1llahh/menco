import {  createBrowserRouter } from "react-router";
import { Providers } from "@/app/providers.tsx";
import App from "@/app/App.tsx";
import { ProtectedLoader, ProtectedRoute } from "@/app/routes/protected-route";
import { ROUTES } from "@/shared/model/routes.ts";
import { LayoutSidebar } from "@/widgets/layout-sidebar";
import { AuthLoader, AuthRoute } from "./auth-route";
import { Suspense } from "react";

const protectedRoutes= [
  {
    loader: ProtectedLoader,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProtectedRoute />
      </Suspense>
    ),
    children: [
      {
        element: <LayoutSidebar />,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import("@/pages/home/home.page"),
          },
          {
            path: ROUTES.PROFILE,
            lazy: () => import("@/pages/profile/profile.page"),
          },
          {
            path: ROUTES.KNOWLEDGE_BASE,
            lazy: () => import("@/pages/knowledge_base/knowledge_base.page"),
          },
          {
            path: ROUTES.SEARCH,
            lazy: () => import("@/pages/search/search.page"),
          },
          {
            path: ROUTES.SCHEDULE,
            lazy: () => import("@/pages/schedule/schedule.page"),
          },
          {
            path: ROUTES.SCHEDULE,
            lazy: () => import("@/pages/schedule/schedule.page"),
          },
          {
            path: ROUTES.ADMIN,
            lazy: () => import("@/pages/admin/admin.page"),
          },
        ],
      },
    ],
  },
];

const authRoutes  = [
  {
    loader: AuthLoader,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthRoute />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/pages/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@/pages/auth/register.page"),
      },
    ],
  },
];

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: '*',
        lazy: () => import('@/pages/not-found/not-found.page'),
      },
      {
        path: ROUTES.MAIN,
        lazy: () => import("@/pages/main/main.page"),
      },

      ...protectedRoutes,
      ...authRoutes,
    ],
  },
]);

export type Router = typeof router;
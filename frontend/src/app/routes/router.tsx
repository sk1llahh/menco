import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import App from '@/app/App.tsx';
import { Providers } from '@/app/providers.tsx';
import {
  ProtectedLoader,
  ProtectedRoute,
} from '@/app/routes/protected-route.tsx';
import { ROUTES } from '@/shared/model/routes';
import { LayoutSidebar } from '@/widgets/layout-sidebar';

import { AuthLoader, AuthRoute } from './auth-route.tsx';

const protectedRoutes = [
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
            lazy: () => import('@/pages/home/home.page.tsx'),
          },
          {
            path: ROUTES.PROFILE,
            lazy: () => import('@/pages/profile/profile.page.tsx'),
          },
          {
            path: ROUTES.KNOWLEDGE_BASE,
            lazy: () =>
              import('@/pages/knowledge_base/knowledge_base.page.tsx'),
          },
          {
            path: ROUTES.SEARCH,
            lazy: () => import('@/pages/search/search.page.tsx'),
          },
          {
            path: ROUTES.SCHEDULE,
            lazy: () => import('@/pages/schedule/schedule.page.tsx'),
          },
          {
            path: ROUTES.SCHEDULE,
            lazy: () => import('@/pages/schedule/schedule.page.tsx'),
          },
          {
            path: ROUTES.ADMIN,
            lazy: () => import('@/pages/admin/admin.page.tsx'),
          },
        ],
      },
    ],
  },
];

const authRoutes = [
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
        lazy: () => import('@/pages/auth/login.page.tsx'),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import('@/pages/auth/register.page.tsx'),
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
        lazy: () => import('@/pages/not-found/not-found.page.tsx'),
      },
      {
        path: ROUTES.MAIN,
        lazy: () => import('@/pages/main/main.page.tsx'),
      },

      ...protectedRoutes,
      ...authRoutes,
    ],
  },
]);

export type Router = typeof router;

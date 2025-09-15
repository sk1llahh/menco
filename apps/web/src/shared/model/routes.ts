import 'react-router';

export const ROUTES = {
  MAIN: '/',

  HOME: '/home',

  LOGIN: '/login',
  REGISTER: '/register',

  ADMIN: '/admin',

  PROFILE: '/profile',

  SEARCH: '/search',

  SCHEDULE: '/schedule',

  KNOWLEDGE_BASE: '/knowledge_base',

  USERS: '/users',
  CHALLENGES: '/challenges',
  CHATS: '/chats',
  QNA: '/qna',

  ENROLLMENTS: '/enrollments',
  PROGRESS: '/progress',

  MENTOR_PROFILE: '/mentor/profile',
  MENTOR_APPLICATIONS: '/mentor/applications',
  MENTOR_REQUESTS: '/mentor/requests',
  MENTOR_AVAILABILITY: '/mentor/availability',
  MENTOR_SESSIONS: '/mentor/sessions',

  PLANS: '/plans',
  SUBSCRIPTIONS: '/subscriptions',
  PAYMENTS: '/payments',

  NOTIFICATIONS: '/notifications',
} as const;

export type AppRoutes = keyof typeof ROUTES;

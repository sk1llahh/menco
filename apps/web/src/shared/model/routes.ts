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

  // Catalogs / Social
  USERS: '/users',
  CHALLENGES: '/challenges',
  CHATS: '/chats',
  QNA: '/qna',

  // Learning / Progress
  ENROLLMENTS: '/enrollments',
  PROGRESS: '/progress',

  // Mentor area
  MENTOR_PROFILE: '/mentor/profile',
  MENTOR_APPLICATIONS: '/mentor/applications',
  MENTOR_REQUESTS: '/mentor/requests',
  MENTOR_AVAILABILITY: '/mentor/availability',
  MENTOR_SESSIONS: '/mentor/sessions',

  // Billing
  PLANS: '/plans',
  SUBSCRIPTIONS: '/subscriptions',
  PAYMENTS: '/payments',

  // Notifications
  NOTIFICATIONS: '/notifications',
} as const;

export type AppRoutes = keyof typeof ROUTES;

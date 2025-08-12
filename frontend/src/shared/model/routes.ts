import "react-router";

export const ROUTES = {
  MAIN: "/",

  HOME: "/home",

  LOGIN: "/login",
  REGISTER: "/register",

  PROFILE: "/profile",

  SEARCH: "/search",

  SCHEDULE: "/schedule",

  KNOWLEDGE_BASE: "/knowledge_base",
} as const;


export type AppRoutes = keyof typeof ROUTES;
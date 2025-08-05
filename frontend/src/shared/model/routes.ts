import "react-router";

export const ROUTES = {
  HOME: "/",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // User Profile
  PROFILE: "/profile",

  // Mentorship
  SEARCH: "/search",
  MENTOR_PROFILE: "/mentor/:id",
  REQUESTS: "/requests",
  REQUEST_DETAILS: "/requests/:id",

  // Schedule
  SCHEDULE: "/schedule",
  SCHEDULE_SESSION: "/schedule/:sessionId",

  // Knowledge Base
  KNOWLEDGE_BASE: "/knowledge",
  KNOWLEDGE_ARTICLE: "/knowledge/:slug",

  // Q&A
  QUESTIONS: "/questions",
  QUESTION_DETAILS: "/questions/:questionId",
} as const;


export type AppRoutes = keyof typeof ROUTES;
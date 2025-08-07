import api from "@/shared/api/api";

export const userApi = {
  login: (body: unknown) => api.post("/auth/login", body),

  register: (body: unknown) => api.post("/auth/register", body),

  getProfile: () => api.get("/auth/profile"),

  logout: () => api.post("/auth/logout"),
};

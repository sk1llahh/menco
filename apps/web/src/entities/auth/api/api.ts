import api from '@/shared/api/api';

export const authApi = {
  login: (body: unknown) => api.post('/auth/login', body),
  register: (body: unknown) => api.post('/auth/register', body),
  refresh: (body: unknown) => api.post('/refresh', body),
  logout: (body: unknown) => api.post('/logout', body),
  logoutAll: (body: unknown) => api.post('/logout-all', body),
};

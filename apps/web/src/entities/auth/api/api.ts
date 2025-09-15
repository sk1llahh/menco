import api from '@/shared/api/api';
import type { LoginBody, RegisterBody, RefreshBody } from '@repo/types';

export const authApi = {
  login: (body: LoginBody) => api.post('/auth/login', body),
  register: (body: RegisterBody) => api.post('/auth/register', body),
  refresh: (body: RefreshBody) => api.post('/auth/refresh', body),
  logout: (body: Partial<RefreshBody>) => api.post('/auth/logout', body),
  logoutAll: () => api.post('/auth/logout-all', {}),
};

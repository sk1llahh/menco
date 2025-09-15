import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { sessionManager } from '@/shared/model/session';
import { CONFIG } from '../model/config';

const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = sessionManager.refreshToken;
    if (!refreshToken) throw new Error('No refresh token');
    const res = await api.post('/auth/refresh', { refreshToken });
    const newAccess = res?.data?.data?.accessToken ?? null;
    const newRefresh = res?.data?.data?.refreshToken ?? null;
    if (newAccess) sessionManager.login(newAccess);
    if (newRefresh) sessionManager.refreshToken = newRefresh;
    return newAccess;
  } catch (e) {
    sessionManager.logout();
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = sessionManager.token;

  if (token) {
    // @ts-ignore
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (
      status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes('/login') &&
      !original.url?.includes('/register') &&
      !original.url?.includes('/refresh')
    ) {
      original._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (!newToken) {
        return Promise.reject(error);
      }

      original.headers = original.headers ?? {};
      (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
      return api(original);
    }

    return Promise.reject(error);
  }
);

export default api;

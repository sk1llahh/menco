import '@repo/config'
export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL + '/api',
} as const;

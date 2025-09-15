const rawApiUrl = (import.meta.env.VITE_API_URL ?? '').toString().trim();
const hasApiUrl = rawApiUrl && rawApiUrl !== 'undefined' && rawApiUrl !== 'null';

const API_BASE_URL = hasApiUrl
  ? rawApiUrl.replace(/\/$/, '')
  : (typeof window !== 'undefined'
      ? new URL('/api', window.location.origin).toString().replace(/\/$/, '')
      : '/api');

if (!hasApiUrl && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn('[CONFIG] VITE_API_URL is not set. Using', API_BASE_URL);
}

export const CONFIG = {
  API_BASE_URL,
} as const;

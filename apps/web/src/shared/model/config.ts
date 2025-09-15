const rawApiUrl = (import.meta.env.VITE_API_URL ?? '').toString().trim();
const hasApiUrl = rawApiUrl && rawApiUrl !== 'undefined' && rawApiUrl !== 'null';

// Fallback to current origin in development if VITE_API_URL is not provided
const baseOrigin = hasApiUrl ? rawApiUrl : (typeof window !== 'undefined' ? window.location.origin : '');

// Ensure no trailing slash on base and correct '/api' join
const API_BASE_URL = (baseOrigin ? new URL('/api', baseOrigin).toString() : '/api').replace(/\/$/, '');

if (!hasApiUrl && typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.warn('[CONFIG] VITE_API_URL is not set. Using', API_BASE_URL);
}

export const CONFIG = {
  API_BASE_URL,
} as const;

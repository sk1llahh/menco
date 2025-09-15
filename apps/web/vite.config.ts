import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { CONFIG as Shared } from '@repo/config';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env from monorepo root to support root-level .env.* files
  const rootDir = path.resolve(__dirname, '..', '..');
  const env = loadEnv(mode, rootDir, '');

  // Compose from shared config with robust fallbacks (in case @repo/config wasn't rebuilt yet)
  const host = env.API_HOST || process.env.API_HOST || 'localhost';
  const port = env.API_PORT || process.env.API_PORT || '3001';
  const rawPrefix = (Shared?.API_PATH_PREFIX ?? env.API_PATH_PREFIX ?? process.env.API_PATH_PREFIX ?? '/api') as string;
  const prefix = (rawPrefix.startsWith('/') ? rawPrefix : `/${rawPrefix}`).replace(/\/$/, '');
  const originFallback = (env.VITE_API_URL || process.env.VITE_API_URL || `http://${host}:${port}`) as string;
  const origin = (Shared?.VITE_API_URL ?? originFallback).replace(/\/$/, '');
  const apiUrl = (Shared?.API_URL ? Shared.API_URL : `${origin}${prefix}`).replace(/\/$/, '');
  const webPort = (Shared as any)?.WEB_DEV_PORT ?? Number(env.WEB_DEV_PORT || process.env.WEB_DEV_PORT || 5173);
  // Derive origin for proxy: remove prefix suffix if present
  const apiOrigin = apiUrl.endsWith(prefix) ? apiUrl.slice(0, apiUrl.length - prefix.length) : apiUrl;

  return {
    // Make import.meta.env read env.* from monorepo root (if you keep env files there)
    envDir: rootDir,
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: webPort,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiOrigin,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
  };
});

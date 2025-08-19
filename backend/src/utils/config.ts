import * as process from 'node:process';

export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  PORT: Number(process.env.BACKEND_PORT ?? 4000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  JWT_EXPIRES: '7d',
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
} as const;

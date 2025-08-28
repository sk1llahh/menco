import * as process from 'node:process';

export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret',
  PORT: Number(process.env.BACKEND_PORT ?? 4000),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ACCESS_TTL: process.env.ACCESS_TTL ?? '15m',
  REFRESH_TTL_DAYS: Number(process.env.REFRESH_TTL_DAYS ?? 30),
  FRONTEND_URL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
} as const;

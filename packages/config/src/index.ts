import { config as loadEnv } from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const resolvedEnvPath = (() => {
  const override = process.env.DOTENV_CONFIG_PATH;
  if (override && fs.existsSync(override)) return override;
  const pkgDir = path.dirname(fileURLToPath(new URL("../", import.meta.url)));
  const pkgEnv = path.join(pkgDir, ".env");
  if (fs.existsSync(pkgEnv)) return pkgEnv;
  const rootEnv = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(rootEnv)) return rootEnv;
  return undefined;
})();

if (resolvedEnvPath) {
  loadEnv({ path: resolvedEnvPath });
} else {
  loadEnv();
}
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z.string().min(1).default("secret"),
  ACCESS_TTL: z.string().min(1).default("15m"),
  REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(30),
  FRONTEND_URL: z.string().min(1).default("http://localhost:5173"),
  DATABASE_URL: z.string().optional(),
});

const parsed = EnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  BACKEND_PORT: process.env.BACKEND_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TTL: process.env.ACCESS_TTL,
  REFRESH_TTL_DAYS: process.env.REFRESH_TTL_DAYS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsed.success) {
  const message = parsed.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${message}`);
}

export const CONFIG = {
  NODE_ENV: parsed.data.NODE_ENV,
  PORT: parsed.data.BACKEND_PORT,
  JWT_SECRET: parsed.data.JWT_SECRET,
  ACCESS_TTL: parsed.data.ACCESS_TTL,
  REFRESH_TTL_DAYS: parsed.data.REFRESH_TTL_DAYS,
  FRONTEND_URL: parsed.data.FRONTEND_URL,
  DATABASE_URL: parsed.data.DATABASE_URL,
} as const;

export type AppConfig = typeof CONFIG;

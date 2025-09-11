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

const csv = (v?: string | null): string[] =>
  (v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const RawEnv = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z.string().optional(),
  ACCESS_TTL: z.string().min(1).default("15m"),
  REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(30),
  FRONTEND_URL: z.string().min(1).default("http://localhost:5173"),
  DATABASE_URL: z.string().optional(),
  ADMIN_LOGINS: z.string().optional(),
});

const ConfigSchema = RawEnv.superRefine((data, ctx) => {
  if (data.NODE_ENV === "production" && !data.JWT_SECRET) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "JWT_SECRET is required in production",
      path: ["JWT_SECRET"],
    });
  }
}).transform((data) => {
  return {
    NODE_ENV: data.NODE_ENV,
    PORT: data.BACKEND_PORT,
    JWT_SECRET: data.JWT_SECRET ?? "dev-secret",
    ACCESS_TTL: data.ACCESS_TTL,
    REFRESH_TTL_DAYS: data.REFRESH_TTL_DAYS,
    FRONTEND_URL: data.FRONTEND_URL,
    DATABASE_URL: data.DATABASE_URL,
    ADMIN_LOGINS: csv(data.ADMIN_LOGINS),
  } as const;
});

type InferConfig = z.infer<typeof ConfigSchema>;

const result = ConfigSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  BACKEND_PORT: process.env.BACKEND_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TTL: process.env.ACCESS_TTL,
  REFRESH_TTL_DAYS: process.env.REFRESH_TTL_DAYS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_LOGINS: process.env.ADMIN_LOGINS,
});

if (!result.success) {
  const message = result.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");
  throw new Error(`Invalid environment configuration: ${message}`);
}

export const CONFIG: InferConfig = result.data;
export type AppConfig = typeof CONFIG;

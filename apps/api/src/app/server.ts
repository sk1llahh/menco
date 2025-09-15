import cors from "cors";
import type { Express } from "express";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "@/features";
import { errorHandler, notFound } from "@/shared/middlewares/error";
import { CONFIG } from "@/shared/utils/config";

export function createServer(): Express {
  const app = express();

  const ALLOWED_ORIGINS = (CONFIG.FRONTEND_URL || "*")
    .split(",")
    .map((s: string) => s.trim());
  const PREFIX = CONFIG.API_PATH_PREFIX || "/api";

  app.use(
    cors({
      origin: (origin, cb) => {
        if (
          !origin ||
          ALLOWED_ORIGINS.includes("*") ||
          ALLOWED_ORIGINS.includes(origin)
        )
          return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
      },
      credentials: true,
    })
  );

  app.use(helmet());
  if (CONFIG.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: false, limit: "2mb" }));

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(`${PREFIX}/auth`, authLimiter);

  app.get(`${PREFIX}/health`, (_req, res) => {
    res.json({
      success: true,
      data: { ok: true, ts: new Date().toISOString() },
    });
  });

  app.use(PREFIX, apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

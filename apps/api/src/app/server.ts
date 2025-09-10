import type { Express } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { notFound, errorHandler } from "@/shared/middlewares/error";
import { CONFIG } from "@/shared/utils/config";
import apiRoutes from "@/features";

export function createServer(): Express {
  const app = express();

  const ALLOWED_ORIGINS = (CONFIG.FRONTEND_URL || "*")
    .split(",")
    .map((s: string) => s.trim());

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

  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: false, limit: "2mb" }));

  app.use("/api", apiRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  NotificationIdParamsSchema,
  NotificationListQuerySchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", authGuard, validate({ query: NotificationListQuerySchema }), c.list);
r.post(
  "/:id/read",
  authGuard,
  validate({ params: NotificationIdParamsSchema }),
  c.markRead
);
r.post("/read-all", authGuard, c.markAllRead);

export default r as import("express").Router;

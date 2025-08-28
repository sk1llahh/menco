import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { authGuard } from "@/middlewares/auth";
import {
  NotificationIdParamsSchema,
  NotificationListQuerySchema,
} from "./schema";

const r = Router();

r.get("/", authGuard, validate({ query: NotificationListQuerySchema }), c.list);
r.post("/:id/read", authGuard, validate({ params: NotificationIdParamsSchema }), c.markRead);
r.post("/read-all", authGuard, c.markAllRead);

export default r;
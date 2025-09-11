import {
  ReviewCreateSchema,
  SessionCreateSchema,
  SessionIdParamsSchema,
  SessionListQuerySchema,
  SessionUpdateStatusSchema,
} from "@repo/types";
import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";

const r: ExpressRouter = Router();

r.get("/", authGuard, validate({ query: SessionListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: SessionCreateSchema }), c.create);
r.patch(
  "/:id/status",
  authGuard,
  validate({ params: SessionIdParamsSchema, body: SessionUpdateStatusSchema }),
  c.updateStatus
);
r.post(
  "/:id/review",
  authGuard,
  validate({ params: SessionIdParamsSchema, body: ReviewCreateSchema }),
  c.addReview
);

export default r as import("express").Router;

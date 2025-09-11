import {
  SubscriptionCreateSchema,
  SubscriptionIdParamsSchema,
  SubscriptionListQuerySchema,
} from "@repo/types";
import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";

const r: ExpressRouter = Router();

r.get("/", authGuard, validate({ query: SubscriptionListQuerySchema }), c.list);
r.get("/me", authGuard, c.my);
r.post("/", authGuard, validate({ body: SubscriptionCreateSchema }), c.create);
r.post(
  "/:id/cancel",
  authGuard,
  validate({ params: SubscriptionIdParamsSchema }),
  c.cancel
);

export default r as import("express").Router;

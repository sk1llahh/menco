import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  PaymentCreateSchema,
  PaymentIdParamsSchema,
  PaymentListQuerySchema,
  PaymentUpdateStatusSchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", authGuard, validate({ query: PaymentListQuerySchema }), c.list);
r.get("/:id", authGuard, validate({ params: PaymentIdParamsSchema }), c.get);
r.post("/", authGuard, validate({ body: PaymentCreateSchema }), c.create);

r.patch(
  "/:id/status",
  authGuard,
  validate({ params: PaymentIdParamsSchema, body: PaymentUpdateStatusSchema }),
  c.updateStatus
);

export default r as import("express").Router;

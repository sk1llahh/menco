import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  PlanCreateSchema,
  PlanIdParamsSchema,
  PlanListQuerySchema,
  PlanUpdateSchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", validate({ query: PlanListQuerySchema }), c.list);
r.get("/:id", validate({ params: PlanIdParamsSchema }), c.get);

r.post("/", authGuard, validate({ body: PlanCreateSchema }), c.create);
r.patch(
  "/:id",
  authGuard,
  validate({ params: PlanIdParamsSchema, body: PlanUpdateSchema }),
  c.update
);
r.delete("/:id", authGuard, validate({ params: PlanIdParamsSchema }), c.remove);

export default r as import("express").Router;

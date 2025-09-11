import {
  ProgressIdParamsSchema,
  ProgressListQuerySchema,
  ProgressUpdateSchema,
} from "@repo/types";
import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";

const r: ExpressRouter = Router();
r.get("/", authGuard, validate({ query: ProgressListQuerySchema }), c.list);
r.put(
  "/:id",
  authGuard,
  validate({ params: ProgressIdParamsSchema, body: ProgressUpdateSchema }),
  c.update
);

export default r as import("express").Router;

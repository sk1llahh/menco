import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  EnrollmentCreateSchema,
  EnrollmentIdParamsSchema,
  EnrollmentListQuerySchema,
} from "@repo/types";

const r: ExpressRouter = Router();
r.get("/", authGuard, validate({ query: EnrollmentListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: EnrollmentCreateSchema }), c.create);
r.post(
  "/:id/finish",
  authGuard,
  validate({ params: EnrollmentIdParamsSchema }),
  c.finish
);

export default r as import("express").Router;

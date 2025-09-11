import {
  UserIdParamsSchema,
  UsersListQuerySchema,
  UserUpdateSchema,
} from "@repo/types";
import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard, requireAdmin } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";

const r: ExpressRouter = Router();
r.get("/", requireAdmin, validate({ query: UsersListQuerySchema }), c.list);
r.get("/:id", authGuard, validate({ params: UserIdParamsSchema }), c.getById);
r.patch("/me", authGuard, validate({ body: UserUpdateSchema }), c.updateMe);
export default r as import("express").Router;

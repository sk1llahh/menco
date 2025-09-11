import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  ChallengeCreateSchema,
  ChallengeIdParamsSchema,
  ChallengeListQuerySchema,
  TaskCreateSchema,
  TaskIdParamsSchema,
  TaskListQuerySchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", validate({ query: ChallengeListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: ChallengeCreateSchema }), c.create);
r.get("/:id", validate({ params: ChallengeIdParamsSchema }), c.get);

r.get(
  "/:id/tasks",
  validate({ params: ChallengeIdParamsSchema, query: TaskListQuerySchema }),
  c.tasks
);
r.post(
  "/:id/tasks",
  authGuard,
  validate({ params: ChallengeIdParamsSchema, body: TaskCreateSchema }),
  c.addTask
);
r.delete(
  "/tasks/:id",
  authGuard,
  validate({ params: TaskIdParamsSchema }),
  c.removeTask
);

export default r as import("express").Router;

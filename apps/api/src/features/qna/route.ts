import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  AnswerCreateSchema,
  AnswerIdParamsSchema,
  AnswerListQuerySchema,
  AnswerUpdateSchema,
  QnaCreateSchema,
  QnaIdParamsSchema,
  QnaListQuerySchema,
  QnaUpdateSchema,
} from "@repo/types";

const r: ExpressRouter = Router();

r.get("/", validate({ query: QnaListQuerySchema }), c.list);
r.get("/:id", validate({ params: QnaIdParamsSchema }), c.get);

r.post("/", authGuard, validate({ body: QnaCreateSchema }), c.create);
r.patch(
  "/:id",
  authGuard,
  validate({ params: QnaIdParamsSchema, body: QnaUpdateSchema }),
  c.update
);
r.delete("/:id", authGuard, validate({ params: QnaIdParamsSchema }), c.remove);

// answers
r.get(
  "/:id/answers",
  validate({ params: QnaIdParamsSchema, query: AnswerListQuerySchema }),
  c.answers
);
r.post(
  "/:id/answers",
  authGuard,
  validate({ params: QnaIdParamsSchema, body: AnswerCreateSchema }),
  c.addAnswer
);
r.patch(
  "/answers/:id",
  authGuard,
  validate({ params: AnswerIdParamsSchema, body: AnswerUpdateSchema }),
  c.updateAnswer
);
r.delete(
  "/answers/:id",
  authGuard,
  validate({ params: AnswerIdParamsSchema }),
  c.removeAnswer
);

export default r as import("express").Router;

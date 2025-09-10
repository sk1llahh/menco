import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import {
  ChatListQuerySchema,
  ChatCreateSchema,
  MessageCreateSchema,
  AddMemberSchema,
  ChatIdParamsSchema,
} from "@repo/types";

const r: ExpressRouter = Router();
r.get("/", authGuard, validate({ query: ChatListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: ChatCreateSchema }), c.create);
r.post(
  "/:id/messages",
  authGuard,
  validate({ params: ChatIdParamsSchema, body: MessageCreateSchema }),
  c.postMessage
);
r.post(
  "/:id/members",
  authGuard,
  validate({ params: ChatIdParamsSchema, body: AddMemberSchema }),
  c.addMember
);

export default r as import("express").Router;

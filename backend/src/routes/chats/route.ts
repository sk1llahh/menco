import { Router } from "express";
import c from "./controller";
import { authGuard } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import {
  ChatListQuerySchema,
  ChatCreateSchema,
  MessageCreateSchema,
  AddMemberSchema,
  ChatIdParamsSchema,
} from "./schema";

const r = Router();
r.get("/", authGuard, validate({ query: ChatListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: ChatCreateSchema }), c.create);
r.post("/:id/messages", authGuard, validate({ params: ChatIdParamsSchema, body: MessageCreateSchema }), c.postMessage);
r.post("/:id/members", authGuard, validate({ params: ChatIdParamsSchema, body: AddMemberSchema }), c.addMember);

export default r;
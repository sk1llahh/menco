import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import { SkillCreateSchema, SkillListQuerySchema } from "@repo/types";

const r: ExpressRouter = Router();
r.get("/", validate({ query: SkillListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: SkillCreateSchema }), c.create);
export default r;

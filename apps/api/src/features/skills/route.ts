import { SkillCreateSchema, SkillListQuerySchema } from "@repo/types";
import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard, requireAdmin } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";

const r: ExpressRouter = Router();
r.get("/", validate({ query: SkillListQuerySchema }), c.list);
r.post("/", requireAdmin, validate({ body: SkillCreateSchema }), c.create);
export default r;

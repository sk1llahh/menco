import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { authGuard } from "@/middlewares/auth";
import { SkillCreateSchema, SkillListQuerySchema } from "./schema";

const r = Router();
r.get("/", validate({ query: SkillListQuerySchema }), c.list);
r.post("/", authGuard, validate({ body: SkillCreateSchema }), c.create);
export default r;
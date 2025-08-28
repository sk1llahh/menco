import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { authGuard } from "@/middlewares/auth";
import {
  PlanCreateSchema,
  PlanIdParamsSchema,
  PlanListQuerySchema,
  PlanUpdateSchema,
} from "./schema";

const r = Router();

r.get("/", validate({ query: PlanListQuerySchema }), c.list);
r.get("/:id", validate({ params: PlanIdParamsSchema }), c.get);

// для простоты защищаем мутации authGuard (можно заменить на adminGuard)
r.post("/", authGuard, validate({ body: PlanCreateSchema }), c.create);
r.patch("/:id", authGuard, validate({ params: PlanIdParamsSchema, body: PlanUpdateSchema }), c.update);
r.delete("/:id", authGuard, validate({ params: PlanIdParamsSchema }), c.remove);

export default r;
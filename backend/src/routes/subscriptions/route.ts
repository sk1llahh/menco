import { Router } from "express";
import { authGuard } from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/plans", c.listPlans);
r.get("/my", authGuard, c.my);
r.post("/", authGuard, c.subscribe);
r.post("/:id/cancel", authGuard, c.cancel);

export default r;
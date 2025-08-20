import { Router } from "express";
import { authGuard } from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/", c.list);
r.post("/profile", authGuard, c.upsertProfile);
r.post("/apply", authGuard, c.apply);
r.post("/request", authGuard, c.requestMentor);

export default r;
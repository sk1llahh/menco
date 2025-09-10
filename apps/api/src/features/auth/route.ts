import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { authGuard } from "@/shared/middlewares/auth";
import { validate } from "@/shared/middlewares/validate";
import c from "./controller";
import { LoginSchema, RefreshSchema, RegisterSchema } from "@repo/types";

const r: ExpressRouter = Router();
r.post("/register", validate({ body: RegisterSchema }), c.register);
r.post("/login", validate({ body: LoginSchema }), c.login);
r.post("/refresh", validate({ body: RefreshSchema }), c.refresh);
r.post("/logout", c.logout);
r.post("/logout-all", authGuard, c.logoutAll);
export default r as import("express").Router;

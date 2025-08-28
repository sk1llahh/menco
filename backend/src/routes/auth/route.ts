import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { LoginSchema, RefreshSchema, RegisterSchema } from "./schema";
import { authGuard } from "@/middlewares/auth";

const r = Router();
r.post("/register", validate({ body: RegisterSchema }), c.register);
r.post("/login", validate({ body: LoginSchema }), c.login);
r.post("/refresh", validate({ body: RefreshSchema }), c.refresh);
r.post("/logout", c.logout);
r.post("/logout-all", authGuard, c.logoutAll);
export default r;
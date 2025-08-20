import {Router} from "express";
import {authGuard} from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/", authGuard, c.list);
r.post("/", authGuard, c.create);

export default r;
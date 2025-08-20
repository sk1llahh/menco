import {Router} from "express";
import {authGuard} from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/", c.list);
r.post("/ask", authGuard, c.ask);
r.post("/answer", authGuard, c.answer);

export default r;
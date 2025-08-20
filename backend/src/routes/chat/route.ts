import { Router } from "express";
import { authGuard } from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/", authGuard, c.my);
r.post("/", authGuard, c.create);

r.get("/:chatId/messages", authGuard, c.messages);
r.post("/messages", authGuard, c.send);

export default r;
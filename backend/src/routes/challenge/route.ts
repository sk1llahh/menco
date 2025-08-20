import { Router } from "express";
import { authGuard } from "@/middlewares/auth.middleware";
import c from "./controller";

const r = Router();

r.get("/", c.list);
r.get("/:challengeId/tasks", c.listTasks);

r.post("/", authGuard, c.create);
r.patch("/:id", authGuard, c.update);
r.delete("/:id", authGuard, c.remove);

r.post("/tasks", authGuard, c.addTask);
r.patch("/tasks/:taskId", authGuard, c.updateTask);

r.post("/enroll", authGuard, c.enroll);
r.post("/unenroll/:challengeId", authGuard, c.unenroll);

r.post("/progress", authGuard, c.setProgress);

export default r;
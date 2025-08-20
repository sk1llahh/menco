import { Router } from 'express';
import {authGuard} from "@/middlewares/auth.middleware";
import c from './controller';

const r = Router();

r.get("/", c.list);
r.get("/:id", c.getById);

r.get("/me/profile", authGuard, c.me);
r.patch("/me/profile", authGuard, c.updateMe);
r.patch("/me/password", authGuard, c.changePassword);
r.delete("/me", authGuard, c.removeMe);

export default r;
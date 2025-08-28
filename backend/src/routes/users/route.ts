import { Router } from "express";
import c from "./controller";
import { validate } from "@/middlewares/validate";
import { UsersListQuerySchema, UserIdParamsSchema, UserUpdateSchema } from "./schema";
import { authGuard } from "@/middlewares/auth";

const r = Router();
r.get("/", validate({ query: UsersListQuerySchema }), c.list);
r.get("/:id", validate({ params: UserIdParamsSchema }), c.getById);
r.patch("/me", authGuard, validate({ body: UserUpdateSchema }), c.updateMe);
export default r;
import { Router } from "express";
import c from "./controller";
const r = Router();

r.get("/", c.list);
r.post("/", c.create);

export default r;
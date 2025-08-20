import {Request, Response} from "express";
import eh from "express-async-handler";
import {ok, fail} from "@/utils/response";
import svc from "./service";
import {SkillCreateBody} from "./types";

type ReqNone = Request;
type ReqCreate = Request<unknown, unknown, SkillCreateBody>;

const list = eh(async (_req: ReqNone, res: Response) => {
  try {
    const r = await svc.list();
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: ReqCreate, res: Response) => {
  try {
    const r = await svc.create(req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {list, create};
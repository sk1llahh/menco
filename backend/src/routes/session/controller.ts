import {Request, Response} from "express";
import eh from "express-async-handler";
import {ok, fail} from "@/utils/response";
import svc from "./service";
import {SessionCreateBody, SessionListQuery, SessionUpdateStatusBody, ReviewCreateBody} from "./types";

type ReqCreate = Request<unknown, unknown, SessionCreateBody>;
type ReqList = Request<unknown, unknown, unknown, SessionListQuery>;
type ReqSetStatus = Request<{ id: string }, unknown, SessionUpdateStatusBody>;
type ReqReview = Request<unknown, unknown, ReviewCreateBody>;

const create = eh(async (req: ReqCreate, res: Response) => {
  try {
    const r = await svc.create(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const r = await svc.list(req.user!.userId, req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const setStatus = eh(async (req: ReqSetStatus, res: Response) => {
  try {
    const r = await svc.setStatus(req.user!.userId, req.params.id, req.body);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const review = eh(async (req: ReqReview, res: Response) => {
  try {
    const r = await svc.review(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {create, list, setStatus, review};
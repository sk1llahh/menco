import {Request, Response} from "express";
import eh from "express-async-handler";
import {ok, fail} from "@/utils/response";
import svc from "./service";
import {MentorProfileUpsertBody, MentorListQuery, MentorApplicationBody, MentorRequestBody} from "./types";

type ReqUpsert = Request<unknown, unknown, MentorProfileUpsertBody>;
type ReqList = Request<unknown, unknown, unknown, MentorListQuery>;
type ReqApply = Request<unknown, unknown, MentorApplicationBody>;
type ReqReq = Request<unknown, unknown, MentorRequestBody>;

const upsertProfile = eh(async (req: ReqUpsert, res: Response) => {
  try {
    const r = await svc.upsertProfile(req.user!.userId, req.body);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const r = await svc.list(req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const apply = eh(async (req: ReqApply, res: Response) => {
  try {
    const r = await svc.apply(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const requestMentor = eh(async (req: ReqReq, res: Response) => {
  try {
    const r = await svc.requestMentor(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {upsertProfile, list, apply, requestMentor};
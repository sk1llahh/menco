import {Request, Response} from "express";
import eh from "express-async-handler";
import {ok, fail} from "@/utils/response";
import svc from "./service";
import {NotificationsListQuery} from "./types";

type ReqList = Request<unknown, unknown, unknown, NotificationsListQuery>;
type ReqMark = Request<{ id: string }>;

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const r = await svc.list(req.user!.userId, req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const markRead = eh(async (req: ReqMark, res: Response) => {
  try {
    const r = await svc.markRead(req.user!.userId, req.params.id);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {list, markRead};
import {Request, Response} from 'express';
import eh from 'express-async-handler';
import {ok, fail} from '@/utils/response';
import svc from './service';
import {SubscribeBody} from './types';

type ReqNone = Request;
type ReqSubscribe = Request<unknown, unknown, SubscribeBody>;
type ReqCancel = Request<{ id: string }>;

const listPlans = eh(async (_req: ReqNone, res: Response) => {
  try {
    const r = await svc.listPlans();
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const my = eh(async (req: ReqNone, res: Response) => {
  try {
    const r = await svc.my(req.user!.userId);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const subscribe = eh(async (req: ReqSubscribe, res: Response) => {
  try {
    const r = await svc.subscribe(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const cancel = eh(async (req: ReqCancel, res: Response) => {
  try {
    const r = await svc.cancel(req.user!.userId, req.params.id);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {listPlans, my, subscribe, cancel};

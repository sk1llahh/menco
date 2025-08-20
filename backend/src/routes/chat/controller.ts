import {Request, Response} from 'express';
import eh from 'express-async-handler';
import {ok, fail} from '@/utils/response';
import svc from './service';
import {ChatListQuery, ChatCreateBody, MessageCreateBody} from './types';

type ReqMy = Request<unknown, unknown, unknown, ChatListQuery>;
type ReqCreate = Request<unknown, unknown, ChatCreateBody>;
type ReqSend = Request<unknown, unknown, MessageCreateBody>;
type ReqMessages = Request<
  { chatId: string },
  unknown,
  { page?: number; limit?: number }
>;

const my = eh(async (req: ReqMy, res: Response) => {
  try {
    const r = await svc.my(req.user!.userId, req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: ReqCreate, res: Response) => {
  try {
    const r = await svc.create(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const send = eh(async (req: ReqSend, res: Response) => {
  try {
    const r = await svc.send(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const messages = eh(async (req: ReqMessages, res: Response) => {
  try {
    const r = await svc.messages(
      req.user!.userId,
      req.params.chatId,
      Number(req.query.page ?? 1),
      Number(req.query.limit ?? 50),
    );
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {my, create, send, messages};

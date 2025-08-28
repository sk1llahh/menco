import { Request, Response } from 'express';
import eh from 'express-async-handler';
import { ok, fail } from '@/utils/response';
import {
  ChatListQuery,
  ChatCreateBody,
  MessageCreateBody,
  AddMemberBody,
  ChatIdParams,
} from './schema';
import svc from './service';

const list = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const query = req.query as unknown as ChatListQuery;
    const result = await svc.list(userId, query);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const body = req.body as ChatCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

const postMessage = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { id } = req.params as ChatIdParams;
    const body = req.body as MessageCreateBody;
    const result = await svc.postMessage(id, userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

const addMember = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as ChatIdParams;
    const body = req.body as AddMemberBody;
    const result = await svc.addMember(id, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

export default { list, create, postMessage, addMember };

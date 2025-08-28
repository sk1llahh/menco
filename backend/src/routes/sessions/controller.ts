import { Request, Response } from 'express';
import eh from 'express-async-handler';
import { ok, fail } from '@/utils/response';
import {
  ReviewCreateBody,
  SessionCreateBody,
  SessionIdParams,
  SessionListQuery,
  SessionUpdateStatusBody,
} from './schema';
import svc from './service';

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as SessionListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user.userId as string;
    const body = req.body as SessionCreateBody;
    const result = await svc.create(studentId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const updateStatus = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as SessionIdParams;
    const actorId = (req as any).user.userId as string;
    const body = req.body as SessionUpdateStatusBody;
    const result = await svc.updateStatus(id, actorId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const addReview = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as SessionIdParams;
    const authorId = (req as any).user.userId as string;
    const body = req.body as ReviewCreateBody;
    const result = await svc.addReview(id, authorId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default { list, create, updateStatus, addReview };

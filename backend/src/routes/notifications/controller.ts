import { Request, Response } from 'express';
import eh from 'express-async-handler';
import { ok, fail } from '@/utils/response';
import { NotificationIdParams, NotificationListQuery } from './schema';
import svc from './service';

const list = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const query = req.query as unknown as NotificationListQuery;
    const result = await svc.list(userId, query);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const markRead = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const { id } = req.params as unknown as NotificationIdParams;
    const result = await svc.markRead(userId, id);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const markAllRead = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const result = await svc.markAllRead(userId);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

export default { list, markRead, markAllRead };

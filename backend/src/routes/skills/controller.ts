import { Request, Response } from 'express';
import eh from 'express-async-handler';
import { ok, fail } from '@/utils/response';
import { SkillCreateBody, SkillListQuery } from './schema';
import svc from './service';

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as SkillListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as SkillCreateBody;
    const result = await svc.create(body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default { list, create };

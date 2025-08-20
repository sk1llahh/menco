import {Request, Response} from 'express';
import eh from 'express-async-handler';
import {fail, ok} from '@/utils/response';
import svc from './service';
import {
  UsersListQuery,
  UsersListResult,
  UpdateMeBody,
  ChangePasswordBody,
} from './types';

type ReqList = Request<unknown, unknown, unknown, UsersListQuery>;
type ReqPatchMe = Request & Request<unknown, unknown, UpdateMeBody>;
type ReqChangePw = Request & Request<unknown, unknown, ChangePasswordBody>;
type ReqGetById = Request<{ id: string }>;

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const result: UsersListResult = await svc.listUsers(req.query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const me = eh(async (req: Request, res: Response) => {
  try {
    const result = await svc.getMe(req.user!.userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const updateMe = eh(async (req: ReqPatchMe, res: Response) => {
  try {
    const result = await svc.updateMe(req.user!.userId, req.body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const changePassword = eh(async (req: ReqChangePw, res: Response) => {
  try {
    const result = await svc.changeMyPassword(req.user!.userId, req.body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const removeMe = eh(async (req: Request, res: Response) => {
  try {
    const result = await svc.deleteMe(req.user!.userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const getById = eh(async (req: ReqGetById, res: Response) => {
  try {
    const result = await svc.getById(req.params.id);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {
  list,
  me,
  updateMe,
  changePassword,
  removeMe,
  getById,
};

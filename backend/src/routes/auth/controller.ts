import {Request, Response} from 'express';
import eh from 'express-async-handler';
import {ok, fail} from '@/utils/response';
import svc from './service';
import {LoginBody, RefreshBody, RegisterBody} from './types';

type ReqRegister = Request<unknown, unknown, RegisterBody>;
type ReqLogin = Request<unknown, unknown, LoginBody>;
type ReqRefresh = Request<unknown, unknown, RefreshBody>;
type ReqLogout = Request<unknown, unknown, Partial<RefreshBody>>;
type ReqLogoutAll = Request;

const register = eh(async (req: ReqRegister, res: Response) => {
  try {
    const result = await svc.register(req.body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const login = eh(async (req: ReqLogin, res: Response) => {
  try {
    const result = await svc.login(req.body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const refresh = eh(async (req: ReqRefresh, res: Response) => {
  try {
    const result = await svc.refresh(req.body.refreshToken);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const logout = eh(async (req: ReqLogout, res: Response) => {
  try {
    const result = await svc.logout(req.body?.refreshToken);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const logoutAll = eh(async (req: ReqLogoutAll, res: Response) => {
  try {
    const result = await svc.logoutAll(req.user!.userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {register, login, refresh, logout, logoutAll};

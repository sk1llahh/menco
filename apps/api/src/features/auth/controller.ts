import type { LoginBody, RefreshBody, RegisterBody } from "@repo/types";
import type { Request, RequestHandler, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

const register = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as RegisterBody;
    const result = await svc.register(body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const login = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginBody;
    const result = await svc.login(body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const refresh = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as RefreshBody;
    const result = await svc.refresh(body.refreshToken);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const logout = eh(async (req: Request, res: Response) => {
  try {
    const token = req.body?.refreshToken as string | undefined;
    const result = await svc.logout(token);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const logoutAll = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const result = await svc.logoutAll(userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  register,
  login,
  refresh,
  logout,
  logoutAll,
} as Record<string, RequestHandler>;

export default controller;

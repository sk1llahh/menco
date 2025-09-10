import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type { UserIdParams, UserUpdateBody, UsersListQuery } from "@repo/types";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as UsersListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const getById = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as UserIdParams;
    const result = await svc.getById(id);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const updateMe = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as UserUpdateBody;
    const result = await svc.updateMe(userId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  getById,
  updateMe,
} as Record<string, RequestHandler>;

export default controller;

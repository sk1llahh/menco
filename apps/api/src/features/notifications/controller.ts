import type { NotificationIdParams, NotificationListQuery } from "@repo/types";
import type { Request, RequestHandler, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

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

const controller = {
  list,
  markRead,
  markAllRead,
} as Record<string, RequestHandler>;

export default controller;

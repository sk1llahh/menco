import type {
  SubscriptionCreateBody,
  SubscriptionIdParams,
  SubscriptionListQuery,
} from "@repo/types";
import type { Request, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as SubscriptionListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const my = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const result = await svc.my(userId);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as SubscriptionCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

const cancel = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const { id } = req.params as unknown as SubscriptionIdParams;
    const result = await svc.cancel(id, userId);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const controller: Record<string, any> = { list, my, create, cancel };
export default controller;

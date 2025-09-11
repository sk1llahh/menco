import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type {
  PaymentCreateBody,
  PaymentIdParams,
  PaymentListQuery,
  PaymentUpdateStatusBody,
} from "@repo/types";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const actorId = (req as any).user.userId as string;
    const actorIsAdmin = Boolean((req as any).user?.isAdmin);
    const query = req.query as unknown as PaymentListQuery;
    const result = await svc.list(query, actorId, actorIsAdmin);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const get = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PaymentIdParams;
    const actorId = (req as any).user.userId as string;
    const actorIsAdmin = Boolean((req as any).user?.isAdmin);
    const result = await svc.get(id, actorId, actorIsAdmin);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as PaymentCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

const updateStatus = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PaymentIdParams;
    const actorId = (req as any).user.userId as string;
    const actorIsAdmin = Boolean((req as any).user?.isAdmin);
    const body = req.body as PaymentUpdateStatusBody;
    const result = await svc.updateStatus(id, actorId, body, actorIsAdmin);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const controller = {
  list,
  get,
  create,
  updateStatus,
} as Record<string, RequestHandler>;

export default controller;

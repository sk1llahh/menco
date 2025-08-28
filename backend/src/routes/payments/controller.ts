import svc from "./service";
import { Request, Response } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/utils/response";
import {
  PaymentCreateBody,
  PaymentIdParams,
  PaymentListQuery,
  PaymentUpdateStatusBody,
} from "./schema";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as PaymentListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) { fail(res, e); }
});

const get = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PaymentIdParams;
    const result = await svc.get(id);
    ok(res, result);
  } catch (e) { fail(res, e); }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as PaymentCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) { fail(res, e); }
});

const updateStatus = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PaymentIdParams;
    const body = req.body as PaymentUpdateStatusBody;
    const result = await svc.updateStatus(id, body);
    ok(res, result);
  } catch (e) { fail(res, e); }
});

export default { list, get, create, updateStatus };
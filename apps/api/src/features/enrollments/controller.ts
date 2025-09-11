import type {
  EnrollmentCreateBody,
  EnrollmentIdParams,
  EnrollmentListQuery,
} from "@repo/types";
import type { Request, RequestHandler, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as EnrollmentListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as EnrollmentCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const finish = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as EnrollmentIdParams;
    const userId = (req as any).user.userId as string;
    const result = await svc.finish(id, userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  create,
  finish,
} as Record<string, RequestHandler>;

export default controller;

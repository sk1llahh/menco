import svc from "./service";
import { Request, Response } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/utils/response";
import {
  EnrollmentCreateBody,
  EnrollmentIdParams,
  EnrollmentListQuery,
} from "./schema";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as EnrollmentListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) { fail(res, e, (e as any).status || 400); }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as EnrollmentCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) { fail(res, e, (e as any).status || 400); }
});

const finish = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as EnrollmentIdParams;
    const userId = (req as any).user.userId as string;
    const result = await svc.finish(id, userId);
    ok(res, result);
  } catch (e) { fail(res, e, (e as any).status || 400); }
});

export default { list, create, finish };
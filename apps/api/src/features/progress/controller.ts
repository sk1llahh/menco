import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type {
  ProgressListQuery,
  ProgressUpdateBody,
  ProgressIdParams,
} from "@repo/types";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as ProgressListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const update = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as ProgressIdParams;
    const userId = (req as any).user.userId as string;
    const body = req.body as ProgressUpdateBody;
    const result = await svc.update(id, userId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  update,
} as Record<string, RequestHandler>;

export default controller;

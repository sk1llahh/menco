import type { SkillCreateBody, SkillListQuery } from "@repo/types";
import type { Request, RequestHandler, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as SkillListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as SkillCreateBody;
    const result = await svc.create(body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  create,
} as Record<string, RequestHandler>;

export default controller;

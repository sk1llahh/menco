import type {
  PlanCreateBody,
  PlanIdParams,
  PlanListQuery,
  PlanUpdateBody,
} from "@repo/types";
import type { Request, RequestHandler, Response } from "express";
import eh from "express-async-handler";
import { fail, ok } from "@/shared/utils/response";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as PlanListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const get = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PlanIdParams;
    const result = await svc.get(id);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const body = req.body as PlanCreateBody;
    const result = await svc.create(body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e);
  }
});

const update = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PlanIdParams;
    const body = req.body as PlanUpdateBody;
    const result = await svc.update(id, body);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const remove = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as PlanIdParams;
    const result = await svc.remove(id);
    ok(res, result);
  } catch (e) {
    fail(res, e);
  }
});

const controller = {
  list,
  get,
  create,
  update,
  remove,
} as Record<string, RequestHandler>;

export default controller;

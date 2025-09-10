import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type {
  ChallengeCreateBody,
  ChallengeIdParams,
  ChallengeListQuery,
  TaskCreateBody,
  TaskIdParams,
  TaskListQuery,
} from "@repo/types";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as ChallengeListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as ChallengeCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const get = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as ChallengeIdParams;
    const result = await svc.get(id);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

// tasks
const tasks = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as ChallengeIdParams;
    const query = req.query as unknown as TaskListQuery;
    const result = await svc.tasks(id, query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const addTask = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as ChallengeIdParams;
    const body = req.body as TaskCreateBody;
    const result = await svc.addTask(id, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const removeTask = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as TaskIdParams;
    const result = await svc.removeTask(id);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  create,
  get,
  tasks,
  addTask,
  removeTask,
} as Record<string, RequestHandler>;

export default controller;

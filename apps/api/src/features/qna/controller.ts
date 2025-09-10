import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type {
  AnswerCreateBody,
  AnswerIdParams,
  AnswerListQuery,
  AnswerUpdateBody,
  QnaCreateBody,
  QnaIdParams,
  QnaListQuery,
  QnaUpdateBody,
} from "@repo/types";
import svc from "./service";

const list = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as QnaListQuery;
    const result = await svc.list(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const get = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as QnaIdParams;
    const result = await svc.get(id);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as QnaCreateBody;
    const result = await svc.create(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const update = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const { id } = req.params as unknown as QnaIdParams;
    const body = req.body as QnaUpdateBody;
    const result = await svc.update(id, userId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const remove = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const { id } = req.params as unknown as QnaIdParams;
    const result = await svc.remove(id, userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

// answers
const answers = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as QnaIdParams;
    const query = req.query as unknown as AnswerListQuery;
    const result = await svc.answers(id, query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const addAnswer = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as QnaIdParams;
    const userId = (req as any).user.userId as string;
    const body = req.body as AnswerCreateBody;
    const result = await svc.addAnswer(id, userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const updateAnswer = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as AnswerIdParams;
    const userId = (req as any).user.userId as string;
    const body = req.body as AnswerUpdateBody;
    const result = await svc.updateAnswer(id, userId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const removeAnswer = eh(async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as AnswerIdParams;
    const userId = (req as any).user.userId as string;
    const result = await svc.removeAnswer(id, userId);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  list,
  get,
  create,
  update,
  remove,
  answers,
  addAnswer,
  updateAnswer,
  removeAnswer,
} as Record<string, RequestHandler>;

export default controller;

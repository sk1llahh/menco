import {Request, Response} from "express";
import eh from "express-async-handler";
import {ok, fail} from "@/utils/response";
import svc from "./service";
import {
  ChallengeListQuery,
  ChallengeCreateBody,
  ChallengeUpdateBody,
  TaskCreateBody,
  TaskUpdateBody,
  EnrollBody,
  ProgressSetBody
} from "./types";

type ReqList = Request<unknown, unknown, unknown, ChallengeListQuery>;
type ReqCreate = Request<unknown, unknown, ChallengeCreateBody>;
type ReqUpdate = Request<{ id: string }, unknown, ChallengeUpdateBody>;
type ReqId = Request<{ id: string }>;

type ReqTaskCreate = Request<unknown, unknown, TaskCreateBody>;
type ReqTaskUpdate = Request<{ taskId: string }, unknown, TaskUpdateBody>;
type ReqTasksList = Request<{ challengeId: string }>;

type ReqEnroll = Request<unknown, unknown, EnrollBody>;
type ReqUnenroll = Request<{ challengeId: string }>;
type ReqProgress = Request<unknown, unknown, ProgressSetBody>;

const list = eh(async (req: ReqList, res: Response) => {
  try {
    const r = await svc.list(req.query);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const create = eh(async (req: ReqCreate, res: Response) => {
  try {
    const r = await svc.create(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const update = eh(async (req: ReqUpdate, res: Response) => {
  try {
    const r = await svc.update(req.params.id, req.user!.userId, req.body);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const remove = eh(async (req: ReqId, res: Response) => {
  try {
    const r = await svc.remove(req.params.id);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const addTask = eh(async (req: ReqTaskCreate, res: Response) => {
  try {
    const r = await svc.addTask(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const updateTask = eh(async (req: ReqTaskUpdate, res: Response) => {
  try {
    const r = await svc.updateTask(req.params.taskId, req.body);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const listTasks = eh(async (req: ReqTasksList, res: Response) => {
  try {
    const r = await svc.listTasks(req.params.challengeId);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const enroll = eh(async (req: ReqEnroll, res: Response) => {
  try {
    const r = await svc.enroll(req.user!.userId, req.body);
    ok(res, r, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const unenroll = eh(async (req: ReqUnenroll, res: Response) => {
  try {
    const r = await svc.unenroll(req.user!.userId, req.params.challengeId);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const setProgress = eh(async (req: ReqProgress, res: Response) => {
  try {
    const r = await svc.setProgress(req.user!.userId, req.body);
    ok(res, r);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

export default {list, create, update, remove, addTask, updateTask, listTasks, enroll, unenroll, setProgress};
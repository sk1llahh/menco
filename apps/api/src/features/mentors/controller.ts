import type { Request, Response } from "express";
import type { RequestHandler } from "express";
import eh from "express-async-handler";
import { ok, fail } from "@/shared/utils/response";
import type {
  ApplicationCreateBody,
  ApplicationUpdateBody,
  AvailabilityIdParams,
  AvailabilityListQuery,
  AvailabilityUpsertBody,
  MentorSearchQuery,
  MentorUpdateBody,
} from "@repo/types";
import svc from "./service";

const search = eh(async (req: Request, res: Response) => {
  try {
    const query = req.query as unknown as MentorSearchQuery;
    const result = await svc.search(query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const upsertMe = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as MentorUpdateBody;
    const result = await svc.upsertMe(userId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const availabilityList = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const query = req.query as unknown as AvailabilityListQuery;
    const result = await svc.availabilityList(userId, query);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const availabilityCreate = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as AvailabilityUpsertBody;
    const result = await svc.availabilityCreate(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const availabilityDelete = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const params = req.params as unknown as AvailabilityIdParams;
    const result = await svc.availabilityDelete(userId, params);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const apply = eh(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId as string;
    const body = req.body as ApplicationCreateBody;
    const result = await svc.apply(userId, body);
    ok(res, result, 201);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

// админ
const setApplicationStatus = eh(async (req: Request, res: Response) => {
  try {
    const appId = req.params?.id as string;
    const body = req.body as ApplicationUpdateBody;
    const result = await svc.setApplicationStatus(appId, body);
    ok(res, result);
  } catch (e) {
    fail(res, e, (e as any).status || 400);
  }
});

const controller = {
  search,
  upsertMe,
  availabilityList,
  availabilityCreate,
  availabilityDelete,
  apply,
  setApplicationStatus,
} as Record<string, RequestHandler>;

export default controller;

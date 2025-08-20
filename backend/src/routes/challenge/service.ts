import dayjs from "dayjs";
import prisma from "@/prisma";
import {error} from "@/utils/errors.ts";
import {parsePagination, paginate} from "@/utils/pagination";
import {
  ChallengeVM,
  ChallengeListQuery,
  ChallengeListResult,
  ChallengeCreateBody,
  ChallengeUpdateBody,
  TaskCreateBody,
  TaskUpdateBody,
  EnrollBody,
  ProgressSetBody
} from "./types";

const toVM = (c: any): ChallengeVM => ({
  id: c.id, title: c.title, description: c.description, category: c.category,
  level: c.level, isPremium: c.isPremium, createdById: c.createdById,
  createdAt: c.createdAt, updatedAt: c.updatedAt,
});

const list = async (query: ChallengeListQuery): Promise<ChallengeListResult> => {
  const {page, limit} = parsePagination(query);
  const where: any = {};
  if (query.category) where.category = query.category;
  if (query.level) where.level = query.level;
  if (typeof query.isPremium === "string") where.isPremium = query.isPremium === "true";

  return paginate<ChallengeVM>(
    () => prisma.challenge.count({where}),
    async (offset, take) => (await prisma.challenge.findMany({
      where,
      skip: offset,
      take,
      orderBy: {createdAt: "desc"}
    })).map(toVM),
    {page, limit}
  );
};

const create = async (userId: string, body: ChallengeCreateBody): Promise<ChallengeVM> => {
  const c = await prisma.challenge.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category,
      level: body.level,
      isPremium: body.isPremium ?? false,
      createdById: userId
    },
  });
  return toVM(c);
};

const update = async (id: string, _userId: string, body: ChallengeUpdateBody): Promise<ChallengeVM> => {
  const c = await prisma.challenge.update({
    where: {id},
    data: {
      title: body.title ?? undefined,
      description: body.description ?? undefined,
      category: body.category ?? undefined,
      level: body.level ?? undefined,
      isPremium: body.isPremium ?? undefined,
    },
  });
  return toVM(c);
};

const remove = async (id: string): Promise<{ id: string }> => {
  await prisma.challenge.delete({where: {id}});
  return {id};
};

const addTask = async (_userId: string, body: TaskCreateBody) => {
  const t = await prisma.task.create({
    data: {
      challengeId: body.challengeId,
      order: body.order,
      type: (body.type ?? "TEXT") as any,
      title: body.title,
      content: body.content as any,
      isRequired: body.isRequired ?? true,
    },
  });
  return t;
};

const updateTask = async (taskId: string, body: TaskUpdateBody) => {
  const t = await prisma.task.update({
    where: {id: taskId},
    data: {
      order: body.order ?? undefined,
      type: (body.type as any) ?? undefined,
      title: body.title ?? undefined,
      content: (body.content as any) ?? undefined,
      isRequired: body.isRequired ?? undefined,
    },
  });
  return t;
};

const listTasks = async (challengeId: string) => {
  return prisma.task.findMany({where: {challengeId}, orderBy: {order: "asc"}});
};

// ENROLLMENTS
const enroll = async (userId: string, body: EnrollBody) => {
  const rec = await prisma.enrollment.upsert({
    where: {userId_challengeId: {userId, challengeId: body.challengeId}},
    create: {userId, challengeId: body.challengeId},
    update: {isActive: true},
  });
  return rec;
};

const unenroll = async (userId: string, challengeId: string) => {
  const rec = await prisma.enrollment.update({
    where: {userId_challengeId: {userId, challengeId}},
    data: {isActive: false, completedAt: dayjs().toDate()},
  });
  return rec;
};

const setProgress = async (userId: string, body: ProgressSetBody) => {
  const task = await prisma.task.findUnique({where: {id: body.taskId}});
  if (!task) throw error('Task not found', 404)

  const p = await prisma.progress.upsert({
    where: {userId_taskId: {userId, taskId: body.taskId}},
    create: {
      userId, taskId: body.taskId, status: body.status as any,
      completedAt: body.status === "COMPLETED" ? dayjs().toDate() : null, notes: body.notes ?? null,
    },
    update: {
      status: body.status as any,
      completedAt: body.status === "COMPLETED" ? dayjs().toDate() : null,
      notes: body.notes ?? null,
    },
  });
  return p;
};

export default {list, create, update, remove, addTask, updateTask, listTasks, enroll, unenroll, setProgress};
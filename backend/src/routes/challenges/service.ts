import prisma from "@/prisma";
import { paginate } from "@/utils/pagination";
import { error } from "@/utils/errors";
import {
  ChallengeCreateBody,
  ChallengeListQuery,
  TaskCreateBody,
  TaskListQuery,
} from "./schema";
import { PageResult } from "@/interfaces/pagination";
import { ChallengeCard, TaskItem, toChallengeCard, toTaskItem } from "./mapper";

const list = async (q: ChallengeListQuery): Promise<PageResult<ChallengeCard>> => {
  const where: any = {};
  if (q.q) where.OR = [
    { title: { contains: q.q, mode: "insensitive" } },
    { description: { contains: q.q, mode: "insensitive" } },
  ];
  if (q.category) where.category = q.category;
  if (q.isPremium) where.isPremium = q.isPremium === "true";

  return paginate<ChallengeCard>(
    () => prisma.challenge.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.challenge.findMany({
        where, orderBy: { createdAt: "desc" }, skip: offset, take: limit,
      });
      return rows.map(toChallengeCard);
    },
    { page: q.page, limit: q.limit }
  );
};

const create = async (userId: string, body: ChallengeCreateBody) => {
  const ch = await prisma.challenge.create({
    data: { ...body, createdById: userId },
  });
  return toChallengeCard(ch);
};

const get = async (id: string) => {
  const ch = await prisma.challenge.findUnique({ where: { id } });
  if (!ch) throw error("Challenge not found", 404);
  return toChallengeCard(ch);
};

// tasks
const tasks = async (challengeId: string, q: TaskListQuery): Promise<PageResult<TaskItem>> => {
  return paginate<TaskItem>(
    () => prisma.task.count({ where: { challengeId } }),
    async (offset, limit) => {
      const rows = await prisma.task.findMany({
        where: { challengeId }, orderBy: { order: "asc" }, skip: offset, take: limit,
      });
      return rows.map(toTaskItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const addTask = async (challengeId: string, body: TaskCreateBody) => {
  const ch = await prisma.challenge.findUnique({ where: { id: challengeId } });
  if (!ch) throw error("Challenge not found", 404);

  const t = await prisma.task.create({
    data: { challengeId, ...body },
  });
  return toTaskItem(t);
};

const removeTask = async (id: string) => {
  await prisma.task.delete({ where: { id } });
  return { ok: true as const };
};

export default { list, create, get, tasks, addTask, removeTask };
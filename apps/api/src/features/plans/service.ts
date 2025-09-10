import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type PlanItem, toPlanItem } from "./mapper";
import type {
  PlanCreateBody,
  PlanListQuery,
  PlanUpdateBody,
} from "@repo/types";

const list = async (q: PlanListQuery): Promise<PageResult<PlanItem>> => {
  const where: any = {};
  const or: any[] = [];
  if (q.q) or.push({ name: { contains: q.q, mode: "insensitive" } });
  if (or.length) where.OR = or;
  if (q.currency) where.currency = q.currency;
  if (q.interval) where.interval = q.interval;

  return paginate<PlanItem>(
    () => prisma.plan.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.plan.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toPlanItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const get = async (id: string): Promise<PlanItem> => {
  const row = await prisma.plan.findUnique({ where: { id } });
  if (!row) throw error("Plan not found", 404);
  return toPlanItem(row);
};

const create = async (body: PlanCreateBody): Promise<PlanItem> => {
  const byName = await prisma.plan.findUnique({ where: { name: body.name } });
  if (byName) throw error("Plan with this name already exists", 409);
  const row = await prisma.plan.create({
    data: {
      name: body.name,
      price: body.price as any,
      currency: body.currency,
      interval: body.interval,
      features: body.features,
    },
  });
  return toPlanItem(row);
};

const update = async (id: string, body: PlanUpdateBody): Promise<PlanItem> => {
  const exists = await prisma.plan.findUnique({ where: { id } });
  if (!exists) throw error("Plan not found", 404);
  if (body.name && body.name !== exists.name) {
    const dupe = await prisma.plan.findUnique({ where: { name: body.name } });
    if (dupe) throw error("Plan with this name already exists", 409);
  }
  const row = await prisma.plan.update({
    where: { id },
    data: {
      name: body.name ?? undefined,
      price: body.price as any,
      currency: body.currency ?? undefined,
      interval: body.interval ?? undefined,
      features: body.features ?? undefined,
    },
  });
  return toPlanItem(row);
};

const remove = async (id: string) => {
  const subs = await prisma.subscription.count({
    where: { planId: id, isActive: true },
  });
  if (subs > 0) throw error("Plan has active subscriptions", 409);
  const del = await prisma.plan.delete({ where: { id } });
  return { ok: !!del };
};

export default { list, get, create, update, remove };

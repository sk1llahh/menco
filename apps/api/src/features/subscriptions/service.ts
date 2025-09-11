import type {
  PageResult,
  SubscriptionCreateBody,
  SubscriptionListQuery,
} from "@repo/types";
import dayjs from "dayjs";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type SubscriptionItem, toSubscriptionItem } from "./mapper";

const list = async (
  q: SubscriptionListQuery
): Promise<PageResult<SubscriptionItem>> => {
  const where: any = {};
  if (q.userId) where.userId = q.userId;
  if (q.isActive) where.isActive = q.isActive === "true";

  return paginate<SubscriptionItem>(
    () => prisma.subscription.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.subscription.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toSubscriptionItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const my = async (userId: string): Promise<SubscriptionItem[]> => {
  const rows = await prisma.subscription.findMany({
    where: { userId, isActive: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toSubscriptionItem);
};

const create = async (userId: string, body: SubscriptionCreateBody) => {
  const plan = await prisma.plan.findUnique({ where: { id: body.planId } });
  if (!plan) throw error("Plan not found", 404);

  const active = await prisma.subscription.findFirst({
    where: { userId, planId: body.planId, isActive: true },
  });
  if (active) throw error("Subscription already active", 409);

  const periodEnd =
    plan.interval === "YEAR"
      ? dayjs().add(1, "year").toDate()
      : dayjs().add(1, "month").toDate();

  const sub = await prisma.subscription.create({
    data: {
      userId,
      planId: body.planId,
      isActive: true,
      currentPeriodEnd: periodEnd,
    },
  });

  await prisma.payment.create({
    data: {
      userId,
      amount: Number(plan.price) as any,
      currency: plan.currency,
      status: "PENDING",
      purpose: "SUBSCRIPTION",
      subscriptionId: sub.id,
      meta: { planName: plan.name, interval: plan.interval },
    } as any,
  });

  return toSubscriptionItem(sub);
};

const cancel = async (id: string, userId: string) => {
  const sub = await prisma.subscription.findUnique({ where: { id } });
  if (!sub) throw error("Subscription not found", 404);
  if (sub.userId !== userId) throw error("Forbidden", 403);
  if (!sub.isActive) return toSubscriptionItem(sub);

  const upd = await prisma.subscription.update({
    where: { id },
    data: { isActive: false },
  });
  return toSubscriptionItem(upd);
};

export default { list, my, create, cancel };

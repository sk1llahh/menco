import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { paginate } from "@/shared/utils/pagination";
import { type NotificationItem, toNotificationItem } from "./mapper";
import type { NotificationListQuery } from "@repo/types";

const list = async (
  userId: string,
  q: NotificationListQuery
): Promise<PageResult<NotificationItem>> => {
  const where: any = { userId };
  if (q.unreadOnly) where.readAt = q.unreadOnly === "true" ? null : undefined;

  return paginate<NotificationItem>(
    () => prisma.notification.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toNotificationItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const markRead = async (userId: string, id: string) => {
  const n = await prisma.notification.findUnique({ where: { id } });
  if (!n || n.userId !== userId) return { ok: true as const };
  await prisma.notification.update({
    where: { id },
    data: { readAt: new Date() },
  });
  return { ok: true as const };
};

const markAllRead = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
  return { ok: true as const };
};

export default { list, markRead, markAllRead };

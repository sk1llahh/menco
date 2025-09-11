import type {
  PageResult,
  ProgressListQuery,
  ProgressUpdateBody,
} from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type ProgressItem, toProgressItem } from "./mapper";

const list = async (
  q: ProgressListQuery
): Promise<PageResult<ProgressItem>> => {
  const where: any = {};
  if (q.userId) where.userId = q.userId;
  if (q.taskId) where.taskId = q.taskId;
  if (q.status) where.status = q.status;

  return paginate<ProgressItem>(
    () => prisma.progress.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.progress.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toProgressItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const update = async (id: string, userId: string, body: ProgressUpdateBody) => {
  const row = await prisma.progress.findUnique({ where: { id } });
  if (!row || row.userId !== userId) throw error("Progress not found", 404);

  const upd = await prisma.progress.update({
    where: { id },
    data: {
      status: body.status,
      notes: body.notes,
      completedAt: body.status === "COMPLETED" ? new Date() : null,
    },
  });
  return toProgressItem(upd);
};

export default { list, update };

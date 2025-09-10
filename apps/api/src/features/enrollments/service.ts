import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type EnrollmentItem, toEnrollmentItem } from "./mapper";
import type { EnrollmentCreateBody, EnrollmentListQuery } from "@repo/types";

const list = async (
  q: EnrollmentListQuery
): Promise<PageResult<EnrollmentItem>> => {
  const where: any = {};
  if (q.userId) where.userId = q.userId;
  if (q.challengeId) where.challengeId = q.challengeId;
  if (q.isActive) where.isActive = q.isActive === "true";

  return paginate<EnrollmentItem>(
    () => prisma.enrollment.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.enrollment.findMany({
        where,
        orderBy: { startedAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toEnrollmentItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const create = async (userId: string, body: EnrollmentCreateBody) => {
  const exists = await prisma.enrollment.findUnique({
    where: { userId_challengeId: { userId, challengeId: body.challengeId } },
  });
  if (exists) throw error("Already enrolled", 409);

  const row = await prisma.enrollment.create({
    data: { userId, challengeId: body.challengeId },
  });
  return toEnrollmentItem(row);
};

const finish = async (id: string, userId: string) => {
  const e = await prisma.enrollment.findUnique({ where: { id } });
  if (!e || e.userId !== userId) throw error("Enrollment not found", 404);
  const upd = await prisma.enrollment.update({
    where: { id },
    data: { completedAt: new Date(), isActive: false },
  });
  return toEnrollmentItem(upd);
};

export default { list, create, finish };

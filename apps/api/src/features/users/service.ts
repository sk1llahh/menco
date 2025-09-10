import type { PageResult, UserItem } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { toUserItem } from "./mapper";
import type { UsersListQuery, UserUpdateBody } from "@repo/types";

const list = async (q: UsersListQuery): Promise<PageResult<UserItem>> => {
  const where: any = {};
  if (q.q)
    where.OR = [
      { login: { contains: q.q, mode: "insensitive" } },
      { name: { contains: q.q, mode: "insensitive" } },
      { email: { contains: q.q, mode: "insensitive" } },
    ];
  if (q.mode) where.mode = q.mode;
  if (q.status) where.status = q.status;

  return paginate<UserItem>(
    () => prisma.user.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toUserItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const getById = async (id: string) => {
  const u = await prisma.user.findUnique({ where: { id } });
  if (!u) throw error("User not found", 404);
  return toUserItem(u);
};

const updateMe = async (userId: string, body: UserUpdateBody) => {
  const u = await prisma.user.update({ where: { id: userId }, data: body });
  return toUserItem(u);
};

export default { list, getById, updateMe };

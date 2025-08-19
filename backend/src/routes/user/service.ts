import createHttpError from 'http-errors';
import httpStatus from 'http-status';

import { PageResult } from '@/interfaces/pagination';
import prisma from '@/prisma';
import { SafeUser, UsersListQuery, UserUpdate } from '@/routes/user/types';
import { paginate, parsePagination } from '@/utils/pagination';

const me = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'Пользователь не найден!');
  }
  return user;
};

const updateMe = async (userId: string, body: UserUpdate) => {
  const user = await prisma.user.update({ where: { id: userId }, data: body });
  return user;
};

const getById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'Пользователь не найден!');
  }
  return user;
};

const list = async (query: UsersListQuery): Promise<PageResult<SafeUser>> => {
  const { page, limit } = parsePagination(query);
  const where = query.q?.trim()
    ? {
        OR: [
          { login: { contains: query.q, mode: 'insensitive' as const } },
          { name: { contains: query.q, mode: 'insensitive' as const } },
          { email: { contains: query.q, mode: 'insensitive' as const } },
        ],
      }
    : {};

  return paginate<SafeUser>(
    () => prisma.user.count({ where }),
    async (offset, take) => {
      const rows = await prisma.user.findMany({
        where,
        skip: offset,
        take,
        orderBy: { createdAt: 'desc' },
      });
      return rows;
    },
    { page, limit },
  );
};

export default {
  me,
  updateMe,
  getById,
  list,
};

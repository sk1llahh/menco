import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import prisma from "@/prisma";


const getUser = async (res: any) => {
  const user = await prisma.user.findUnique({
    where: { id: res.userId }
  });

  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'Пользователь не найден!');
  }

  return user;
};

export default {
  getUser,
};

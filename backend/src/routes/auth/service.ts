import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { CONFIG } from '@/utils/constants/config';
import prisma from "@/prisma";

const login = async (body: any) => {
  const { login, password } = body;

  const user = await prisma.user.findFirst({
    where: { login }
  });

  if (!user) {
    throw createHttpError(
      httpStatus.NOT_FOUND,
      'Такого пользователя не существует!',
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Неверный пароль!');
  }

  const token = jwt.sign(
    { userId: user.id, login: user.login },
    CONFIG.JWT_SECRET,
    { expiresIn: '7d' },
  );

  return { token, user: user };
};

const register = async (body: any) => {
  const { login, password } = body;

  const existingUser = await prisma.user.findUnique({
    where: { login }
  });

  if (existingUser) {
    throw createHttpError(
      httpStatus.BAD_REQUEST,
      'Такой пользователь уже зарегистрирован!',
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      login,
      password: hashedPassword,
    },
  });

  const token = jwt.sign(
    { userId: newUser.id, login: newUser.login },
    CONFIG.JWT_SECRET,
    { expiresIn: '7d' },
  );

  return { token, user: newUser };
};

export default {
  login,
  register,
};

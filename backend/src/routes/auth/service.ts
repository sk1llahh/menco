import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import prisma from "@/prisma";
import {compare, hash} from "@/utils/crypto";
import {signAccessToken} from "@/utils/jwt";
import {LoginBody, RegisterBody} from "@/routes/auth/types";

const login = async (body: LoginBody) => {
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

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Неверный пароль!');
  }

  const token = signAccessToken({ userId: user.id, login: user.login },)

  return { token, user: user };
};

const register = async (body: RegisterBody) => {
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

  const hashedPassword = await hash(password);

  const newUser = await prisma.user.create({
    data: {
      login,
      password: hashedPassword,
    },
  });

  const token = signAccessToken({ userId: newUser.id, login: newUser.login });

  return { token, user: newUser };
};

export default {
  login,
  register,
};

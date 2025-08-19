import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';

import { verifyAccessToken } from '@/utils/jwt';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      createHttpError(httpStatus.UNAUTHORIZED, 'Нет токена авторизации!')
    );
  }

  if (!authHeader.startsWith('Bearer ')) {
    return next(
      createHttpError(
        httpStatus.UNAUTHORIZED,
        'Неверный формат токена! Ожидается "Bearer <token>"'
      )
    );
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(
      createHttpError(httpStatus.UNAUTHORIZED, 'Токен не предоставлен!')
    );
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return next(
      createHttpError(httpStatus.UNAUTHORIZED, 'Невалидный или истекший токен!')
    );
  }
};

export default authentication;

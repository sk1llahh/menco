import createHttpError from "http-errors";
import httpStatus from "http-status";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {CONFIG} from "../utils/constants/config";

interface JwtPayload {
  userId: string;
  login: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authentication = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(
      createHttpError(httpStatus.UNAUTHORIZED, "Нет токена авторизации!")
    );
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(
      createHttpError(
        httpStatus.UNAUTHORIZED,
        'Неверный формат токена! Ожидается "Bearer <token>"'
      )
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      createHttpError(httpStatus.UNAUTHORIZED, "Токен не предоставлен!")
    );
  }

  try {
    const payload = jwt.verify(token, CONFIG.JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return next(
      createHttpError(
        httpStatus.UNAUTHORIZED,
        "Невалидный или истекший токен!"
      )
    );
  }
};

export default authentication;

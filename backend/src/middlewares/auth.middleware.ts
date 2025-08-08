import {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";
import {CONFIG} from "../utils/constants/config";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(createHttpError(httpStatus.UNAUTHORIZED, "Нет токена авторизации!"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, CONFIG.JWT_SECRET);
    // @ts-ignore
    req.user = payload;
    return next();
  } catch (error) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Невалдиная авторизация!')
  }
}

export default authentication
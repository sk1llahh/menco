import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
const authentication  = (req: Request, res: Response, next: NextFunction) => {
    try {
        return next();
    } catch (error) {
        throw createHttpError(httpStatus.UNAUTHORIZED, 'Невалдиная авторизация!')
    }
}

export default authentication
import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import authService from './service';

const login = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);

const register = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.register(req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);

export default {
  login,
  register,
};

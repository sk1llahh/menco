import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import authService from './service';
import { IUser } from '../user/model';

const login = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IUser = {
        login: req.body.login,
        password: req.body.password,
      };
      const result = await authService.login(body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);

const register = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IUser = {
        login: req.body.login,
        password: req.body.password,
      };
      const result = await authService.register(body);
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

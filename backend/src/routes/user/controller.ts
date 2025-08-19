import expressAsyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';

import userService from './service';

const me = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.me(req.user!.userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
);

export default {
  me,
};

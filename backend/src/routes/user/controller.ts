import expressAsyncHandler from 'express-async-handler';
import userService from './service';
import { NextFunction, Request, Response } from 'express';


const getUser = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getUser(req.user);
    res.json(result);
  } catch (e) {
    next(e);
  }
});


export default {
  getUser,
};


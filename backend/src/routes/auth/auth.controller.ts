import { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import authService from './auth.service.js';
import { IUser } from '../user/user.model.js';

const login = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body: IUser = {
      login: req.body.login,
      password: req.body.password,
    }
    const result = await authService.login(body)
    res.json(result)
  } catch (e) {
    next(e)
  }
})

const register = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    let body: IUser = {
      login: req.body.login,
      password: req.body.password,
    }
    const result = await authService.register(body)
    res.json(result)
  } catch (e) {
    next(e)
  }
})

export default {
  login,
  register
};
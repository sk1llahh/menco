import expressAsyncHandler from 'express-async-handler';
import userService from './user.service.js';
import { TUser } from '../auth/auth.types.js';

const getUserById = expressAsyncHandler(async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.id)
    res.json(result)
  } catch (e) {
    next(e);
  }
});

const setUser = expressAsyncHandler(async (req, res, next) => {
  try {
    let body: TUser = {
      login: req.body.login,
      password: req.body.password
    }
    // @ts-ignore
    const result = await userService.setUser(body)
    next()
  } catch (e) {
    next(e);
  }
});


export default {
  getUserById,
  setUser,
};


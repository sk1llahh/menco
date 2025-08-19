import expressAsyncHandler from 'express-async-handler';
import {NextFunction, Request, Response} from 'express';
import userService from './service';
import {UsersListQuery} from "@/routes/user/types";

type ListUsersReq = Request<unknown, unknown, unknown, UsersListQuery>;

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

const updateMe = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.updateMe(req.user!.userId, req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
)

const getById = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await userService.getById(req.params.id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
)

const list = expressAsyncHandler(
  async (req: ListUsersReq, res: Response, next: NextFunction) => {
    try {
      const result = await userService.list(req.query);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
)

export default {
  me,
  updateMe,
  getById,
  list
};

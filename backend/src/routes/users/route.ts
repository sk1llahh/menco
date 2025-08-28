import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  UsersListQuerySchema,
  UserIdParamsSchema,
  UserUpdateSchema,
} from './schema';

const r = Router();
r.get('/', validate({ query: UsersListQuerySchema }), c.list);
r.get('/:id', validate({ params: UserIdParamsSchema }), c.getById);
r.patch('/me', authGuard, validate({ body: UserUpdateSchema }), c.updateMe);
export default r;

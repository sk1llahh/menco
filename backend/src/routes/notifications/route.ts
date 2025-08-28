import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  NotificationIdParamsSchema,
  NotificationListQuerySchema,
} from './schema';

const r = Router();

r.get('/', authGuard, validate({ query: NotificationListQuerySchema }), c.list);
r.post(
  '/:id/read',
  authGuard,
  validate({ params: NotificationIdParamsSchema }),
  c.markRead,
);
r.post('/read-all', authGuard, c.markAllRead);

export default r;

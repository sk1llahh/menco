import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  SubscriptionCreateSchema,
  SubscriptionIdParamsSchema,
  SubscriptionListQuerySchema,
} from './schema';

const r = Router();

r.get('/', authGuard, validate({ query: SubscriptionListQuerySchema }), c.list);
r.get('/me', authGuard, c.my);
r.post('/', authGuard, validate({ body: SubscriptionCreateSchema }), c.create);
r.post(
  '/:id/cancel',
  authGuard,
  validate({ params: SubscriptionIdParamsSchema }),
  c.cancel,
);

export default r;

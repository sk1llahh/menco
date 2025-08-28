import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  ReviewCreateSchema,
  SessionCreateSchema,
  SessionIdParamsSchema,
  SessionListQuerySchema,
  SessionUpdateStatusSchema,
} from './schema';

const r = Router();

r.get('/', authGuard, validate({ query: SessionListQuerySchema }), c.list);
r.post('/', authGuard, validate({ body: SessionCreateSchema }), c.create);
r.patch(
  '/:id/status',
  authGuard,
  validate({ params: SessionIdParamsSchema, body: SessionUpdateStatusSchema }),
  c.updateStatus,
);
r.post(
  '/:id/review',
  authGuard,
  validate({ params: SessionIdParamsSchema, body: ReviewCreateSchema }),
  c.addReview,
);

export default r;

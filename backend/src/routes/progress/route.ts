import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  ProgressListQuerySchema,
  ProgressUpdateSchema,
  ProgressIdParamsSchema,
} from './schema';

const r = Router();
r.get('/', authGuard, validate({ query: ProgressListQuerySchema }), c.list);
r.put(
  '/:id',
  authGuard,
  validate({ params: ProgressIdParamsSchema, body: ProgressUpdateSchema }),
  c.update,
);

export default r;

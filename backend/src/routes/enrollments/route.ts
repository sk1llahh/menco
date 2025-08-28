import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  EnrollmentCreateSchema,
  EnrollmentIdParamsSchema,
  EnrollmentListQuerySchema,
} from './schema';

const r = Router();
r.get('/', authGuard, validate({ query: EnrollmentListQuerySchema }), c.list);
r.post('/', authGuard, validate({ body: EnrollmentCreateSchema }), c.create);
r.post(
  '/:id/finish',
  authGuard,
  validate({ params: EnrollmentIdParamsSchema }),
  c.finish,
);

export default r;

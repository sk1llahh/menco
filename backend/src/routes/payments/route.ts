import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import {
  PaymentCreateSchema,
  PaymentIdParamsSchema,
  PaymentListQuerySchema,
  PaymentUpdateStatusSchema,
} from './schema';

const r = Router();

r.get('/', authGuard, validate({ query: PaymentListQuerySchema }), c.list);
r.get('/:id', authGuard, validate({ params: PaymentIdParamsSchema }), c.get);
r.post('/', authGuard, validate({ body: PaymentCreateSchema }), c.create);
// если нужен вебхук — выносится в отдельный публичный роут без authGuard
r.patch(
  '/:id/status',
  authGuard,
  validate({ params: PaymentIdParamsSchema, body: PaymentUpdateStatusSchema }),
  c.updateStatus,
);

export default r;

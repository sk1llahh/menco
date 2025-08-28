import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import { SkillCreateSchema, SkillListQuerySchema } from './schema';

const r = Router();
r.get('/', validate({ query: SkillListQuerySchema }), c.list);
r.post('/', authGuard, validate({ body: SkillCreateSchema }), c.create);
export default r;

import { Router } from 'express';
import { authGuard } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import c from './controller';
import { LoginSchema, RefreshSchema, RegisterSchema } from './schema';

const r = Router();
r.post('/register', validate({ body: RegisterSchema }), c.register);
r.post('/login', validate({ body: LoginSchema }), c.login);
r.post('/refresh', validate({ body: RefreshSchema }), c.refresh);
r.post('/logout', c.logout);
r.post('/logout-all', authGuard, c.logoutAll);
export default r;

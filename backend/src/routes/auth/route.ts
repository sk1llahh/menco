import {Router} from 'express';
import {authGuard} from '@/middlewares/auth.middleware';
import c from './controller';

const r = Router();

r.post('/register', c.register);
r.post('/login', c.login);
r.post('/refresh', c.refresh);
r.post('/logout', c.logout);
r.post('/logout-all', authGuard, c.logoutAll);

export default r;

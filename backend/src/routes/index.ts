import { Router } from 'express';

import authentication from '../middlewares/auth.middleware';
import authRoute from './auth/route';
import userRoute from './user/route';

const apiRoutes: Router = Router();

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/user', authentication, userRoute);

export default apiRoutes;

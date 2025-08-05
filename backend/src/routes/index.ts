import { Router } from 'express';

import authentication from '../middlewares/auth.middleware.js';

import authRoute from './auth/auth.route.js';
import userRoute from './user/user.route.js';

const apiRoutes = Router();

apiRoutes.use('/auth', authRoute);
apiRoutes.use('/user', authentication, userRoute);

export default apiRoutes;

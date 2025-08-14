import { Router } from 'express';

import userController from './controller';

const router: Router = Router();

router.get('/profile', userController.getUser);

export default router;

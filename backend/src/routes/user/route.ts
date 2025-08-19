import { Router } from 'express';

import userController from './controller';

const router: Router = Router();

router.get('/me', userController.me);

export default router;

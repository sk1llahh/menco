import { Router } from 'express';

import userController from './controller';

const router: Router = Router();

router.get('/me', userController.me);
router.patch('/me', userController.updateMe);
router.get('/:id', userController.getById);
router.get('/list', userController.list);

export default router;

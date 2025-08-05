import { Router } from 'express';
import userController from './user.controller.js';

const router = Router();

//создаю пользователя и сразу создаю группу
router.post('/', userController.setUser);
router.get('/:id', userController.getUserById);

export default router;

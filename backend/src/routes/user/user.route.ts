import {Router} from 'express';
import userController from './user.controller.js';

const router = Router();

router.get('/profile', userController.getUser);

export default router;

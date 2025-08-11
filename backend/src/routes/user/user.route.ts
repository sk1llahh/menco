import {Router} from 'express';
import userController from './user.controller.js';
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.get('/profile', userController.getUser);

export default router;

import {Router} from 'express';
import userController from './user.controller.js';
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.get('/', authMiddleware, userController.getUser);

export default router;

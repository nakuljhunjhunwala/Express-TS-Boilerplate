import { WrapperClass } from '@utils/wrapper.util.js';
import { Router } from 'express';
import { UserController } from './user.controller.js';
import authMiddleware from 'src/middleware/auth.middleware.js';
const router = Router();
const wrappedUserController = new WrapperClass(
  new UserController(),
) as unknown as UserController & { [key: string]: any };

router.get('/me', authMiddleware, wrappedUserController.me);

export default router;

import { WrapperClass } from '@utils/wrapper.util.js';
import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validateRequest } from 'src/middleware/dto-validator.js';
import { RegisterUserDto } from './dto/register.dto.js';
import { LoginUserDto } from './dto/login.dto.js';
import authMiddleware from 'src/middleware/auth.middleware.js';
const router = Router();
const wrappedLoginController = new WrapperClass(
  new AuthController(),
) as unknown as AuthController & { [key: string]: any };

router.post(
  '/login',
  validateRequest(LoginUserDto),
  wrappedLoginController.login,
);
router.post(
  '/register',
  validateRequest(RegisterUserDto),
  wrappedLoginController.createUser,
);
router.delete('/logout', authMiddleware, wrappedLoginController.logout);
router.delete('/logAllOut', authMiddleware, wrappedLoginController.logAllOut);
router.get('/refresh', wrappedLoginController.refresh);

export default router;

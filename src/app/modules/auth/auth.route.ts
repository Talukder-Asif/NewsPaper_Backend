import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  authController.createUser,
);

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRouters = router;

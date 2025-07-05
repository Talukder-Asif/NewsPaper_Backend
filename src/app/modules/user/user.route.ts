import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create',
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser,
);

export const userRouters = router;

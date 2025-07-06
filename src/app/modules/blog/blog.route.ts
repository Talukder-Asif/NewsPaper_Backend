import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { blogPostValidation } from './blog.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../../constants/userRoles';
import { blogPostController } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(blogPostValidation.createBlogPostZodSchema),
  auth(USER_ROLE.user),
  blogPostController.createBlogPost,
);

export const blogPostRoutes = router;

import { Router } from 'express';
import { userRouters } from '../modules/user/user.route';
import { authRouters } from '../modules/auth/auth.route';
import { blogPostRoutes } from '../modules/blog/blog.route';

const router = Router();

const modules = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/auth',
    route: authRouters,
  },
  {
    path: '/blogs',
    route: blogPostRoutes,
  },
];

modules.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

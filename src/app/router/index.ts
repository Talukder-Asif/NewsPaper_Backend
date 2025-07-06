import { Router } from 'express';
import { userRouters } from '../modules/user/user.route';
import { authRouters } from '../modules/auth/auth.route';

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
];

modules.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

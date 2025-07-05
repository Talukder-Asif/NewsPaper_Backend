import { Router } from 'express';
import { userRouters } from '../modules/user/user.route';

const router = Router();

const modules = [
  {
    path: '/users',
    route: userRouters,
  },
];

modules.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

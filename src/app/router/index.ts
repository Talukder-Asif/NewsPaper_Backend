import { Router } from 'express';

const router = Router();

const modules = [
  {
    path: 'users',
    route: 'userRoute',
  },
];

modules.forEach((router) => {
  router.use(router.path, router.route);
});

export default router;

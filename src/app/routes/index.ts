import { Router } from 'express';
import studentRoute from '../modules/student/studentRoute';
import userRouter from '../modules/users/users.route';

const router = Router();

const routeModule = [
  {
    path: '/students',
    router: studentRoute,
  },
  {
    path: '/users',
    router: userRouter,
  },
];

routeModule.forEach(route => router.use(route.path, route.router));

export default router;

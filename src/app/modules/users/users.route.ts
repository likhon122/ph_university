import { Router } from 'express';
import { createStudent } from './users.controller';

const userRouter = Router();

userRouter.post('/create-student', createStudent);

export default userRouter;

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { loginValidation } from './auth.validation';
import { changePassword, loginUser } from './auth.controller';

const authRouter = express.Router();

authRouter.post('/login', validateRequest(loginValidation), loginUser);

authRouter.post("/change-password",changePassword)

export default authRouter;

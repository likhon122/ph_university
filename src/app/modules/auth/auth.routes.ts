import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  changePasswordValidation,
  forgotPasswordValidation,
  loginValidation,
  refreshTokenValidation,
  resetPasswordValidation,
} from './auth.validation';
import {
  changePassword,
  forgotPassword,
  loginUser,
  refreshToken,
  resetPassword,
} from './auth.controller';
import auth from '../../middleware/auth';
import { User_Roles } from '../users/user.constant';

const authRouter = express.Router();

authRouter.post('/login', validateRequest(loginValidation), loginUser);

authRouter.post(
  '/change-password',
  auth(User_Roles.student, User_Roles.faculty, User_Roles.admin),
  validateRequest(changePasswordValidation),
  changePassword,
);

authRouter.post(
  '/refresh-token',
  validateRequest(refreshTokenValidation),
  refreshToken,
);

authRouter.post(
  '/forgot-password',
  validateRequest(forgotPasswordValidation),
  forgotPassword,
);

authRouter.post(
  '/reset-password',
  auth(User_Roles.student, User_Roles.faculty, User_Roles.admin),
  validateRequest(resetPasswordValidation),
  resetPassword,
);



export default authRouter;

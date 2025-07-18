import { Router } from 'express';
import {
  createAdmin,
  createFaculty,
  createStudent,
  getMe,
  updateStatus,
} from './users.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import checkUserIsExit from '../../middleware/checkUserExist';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import checkFacultyExist from '../../middleware/checkFacultyExist';
import { createAdminValidationSchema } from '../admin/admin.validation';
import checkAdminExist from '../../middleware/checkAdminExist';
import auth from '../../middleware/auth';
import { User_Roles } from './user.constant';
import { updateStatusValidation } from './users.validation';
import upload from '../../utils/multerFileExtract';
import AppError from '../../errors/AppError';

const userRouter = Router();

userRouter.post(
  '/create-student',
  auth(User_Roles.admin),
  upload.single('profileImage'),
  (req, res, next) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body?.data);
      next();
    } else {
      throw new AppError(400, 'Please provide data field in JSON format');
    }
  },
  validateRequest(createStudentValidationSchema),
  checkUserIsExit,
  createStudent,
);

userRouter.post(
  '/create-faculty',
  auth(User_Roles.admin),
  upload.single('profileImage'),
  (req, res, next) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body?.data);
      next();
    } else {
      throw new AppError(400, 'Please provide data field in JSON format');
    }
  },
  validateRequest(createFacultyValidationSchema),
  checkFacultyExist,
  createFaculty,
);

userRouter.post(
  '/create-admin',
  // auth(User_Roles.admin),
  upload.single('profileImage'),
  (req, res, next) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body?.data);
      next();
    } else {
      throw new AppError(400, 'Please provide data field in JSON format');
    }
  },
  validateRequest(createAdminValidationSchema),
  checkAdminExist,
  createAdmin,
);

userRouter.get(
  '/me',
  auth(User_Roles.student, User_Roles.faculty, User_Roles.admin),
  getMe,
);

userRouter.patch(
  '/update-status/:id',
  auth(User_Roles.admin),
  validateRequest(updateStatusValidation),
  updateStatus,
);

export default userRouter;

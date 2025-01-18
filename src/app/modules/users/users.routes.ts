import { Router } from 'express';
import { createAdmin, createFaculty, createStudent } from './users.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import checkUserIsExit from '../../middleware/checkUserExist';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import checkFacultyExist from '../../middleware/checkFacultyExist';
import { createAdminValidationSchema } from '../admin/admin.validation';
import checkAdminExist from '../../middleware/checkAdminExist';

const userRouter = Router();

userRouter.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  checkUserIsExit,
  createStudent,
);

userRouter.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  checkFacultyExist,
  createFaculty,
);

userRouter.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  checkAdminExist,
  createAdmin,
);

export default userRouter;

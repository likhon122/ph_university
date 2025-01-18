import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicDepartmentValidationSchema,
  getSingleAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academicDepartment.validation';
import {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
} from './academicDepartment.controller';
import checkAcademicFacultyAndNameExist from '../../middleware/checkAcademicFacultyExist';

const academicDepartmentRoutes = Router();

academicDepartmentRoutes.post(
  '/create-academic-department',
  validateRequest(createAcademicDepartmentValidationSchema),
  checkAcademicFacultyAndNameExist,
  createAcademicDepartment,
);

academicDepartmentRoutes.get(
  '/get-all-academic-department',
  getAcademicDepartments,
);

academicDepartmentRoutes.get(
  '/:departmentId',
  validateRequest(getSingleAcademicDepartmentValidationSchema),
  getSingleAcademicDepartment,
);

academicDepartmentRoutes.patch(
  '/:departmentId',
  validateRequest(updateAcademicDepartmentValidationSchema),
  updateAcademicDepartment,
);

export default academicDepartmentRoutes;

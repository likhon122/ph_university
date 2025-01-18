import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicSemesterValidationSchema,
  getSingleAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';
import {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
} from './academicSemester.controller';

const academicSemesterRoutes = Router();

academicSemesterRoutes.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemester,
);

academicSemesterRoutes.get('/get-all-academic-semesters', getAcademicSemesters);

academicSemesterRoutes.get(
  '/:id',
  validateRequest(getSingleAcademicSemesterValidationSchema),
  getSingleAcademicSemester,
);

academicSemesterRoutes.patch(
  '/:id',
  validateRequest(updateAcademicSemesterValidationSchema),
  updateAcademicSemester,
);

export default academicSemesterRoutes;

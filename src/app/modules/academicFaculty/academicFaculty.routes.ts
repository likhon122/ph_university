import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  getSingleAcademicFacultyValidationSchema,
  updateFacultyValidationSchema,
} from './academicFaculty.validation';
import {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
} from './academicFaculty.controller';
import checkAcademicFacultyNameExist from '../../middleware/checkAcademicFacultyNameExist';

const academicFacultyRoutes = Router();

academicFacultyRoutes.post(
  '/create-academic-faculty',
  validateRequest(createAcademicFacultyValidationSchema),
  checkAcademicFacultyNameExist,
  createAcademicFaculty,
);

academicFacultyRoutes.get('/get-all-academic-faculty', getAcademicFaculties);

academicFacultyRoutes.get(
  '/:facultyId',
  validateRequest(getSingleAcademicFacultyValidationSchema),
  getSingleAcademicFaculty,
);

academicFacultyRoutes.patch(
  '/:facultyId',
  validateRequest(updateFacultyValidationSchema),
  updateAcademicFaculty,
);

export default academicFacultyRoutes;

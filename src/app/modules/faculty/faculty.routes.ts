import express from 'express';
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { User_Roles } from '../users/user.constant';

const facultyRoutes = express.Router();

facultyRoutes.get(
  '/get-all-faculties',
  auth(User_Roles.admin, User_Roles.faculty),
  getAllFaculties,
);
facultyRoutes.get('/:id', getSingleFaculty);

facultyRoutes.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  updateFaculty,
);

facultyRoutes.delete('/:id', deleteFaculty);

export default facultyRoutes;

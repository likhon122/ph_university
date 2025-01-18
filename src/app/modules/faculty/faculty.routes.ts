import express from 'express';
import {
  deleteFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
} from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import validateRequest from '../../middleware/validateRequest';

const facultyRoutes = express.Router();

facultyRoutes.get('/get-all-faculties', getAllFaculties);
facultyRoutes.get('/:id', getSingleFaculty);

facultyRoutes.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  updateFaculty,
);

facultyRoutes.delete('/:id', deleteFaculty);

export default facultyRoutes;

import express from 'express';
import {
  deleteStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
} from './student.controller';
import checkStudentExist from '../../middleware/chechStudentExist';
import { updateStudentValidationSchema } from './student.validation';
import validateRequest from '../../middleware/validateRequest';

const studentRoute = express.Router();

studentRoute.get('/get-all-students', getAllStudents);
studentRoute.get('/:studentId', checkStudentExist, getSingleStudent);
studentRoute.patch('/:studentId', checkStudentExist, updateStudent);
studentRoute.delete(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  checkStudentExist,
  deleteStudent,
);

export default studentRoute;

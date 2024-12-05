import express from 'express';
import { addStudent, getAllStudents } from './student.controllet';

const studentRoute = express.Router();

studentRoute.get('/get-all-students', getAllStudents);
studentRoute.post('/add-student', addStudent);

export default studentRoute;

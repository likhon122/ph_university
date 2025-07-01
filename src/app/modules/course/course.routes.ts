import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  createCourseValidationSchema,
  facultiesWithCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import {
  assignFacultiesWithCourse,
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse,
  removeFacultiesFromCourse,
  updateCourse,
} from './course.controller';
import checkCourseExist from '../../middleware/checkCourseExist';

const courseRoutes = express.Router();

courseRoutes.post(
  '/create-course',
  validateRequest(createCourseValidationSchema),
  checkCourseExist,
  createCourse,
);

courseRoutes.get('/get-all-courses', getAllCourses);
courseRoutes.get('/:id', getSingleCourse);

courseRoutes.patch(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  updateCourse,
);

courseRoutes.delete('/:id', deleteCourse);

courseRoutes.put(
  '/:courseId/assign-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  assignFacultiesWithCourse,
);

courseRoutes.delete(
  '/:courseId/remove-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  removeFacultiesFromCourse,
);

export default courseRoutes;

import express from 'express';
import {
  createOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
} from './offeredCourse.controller';
import validateRequest from '../../middleware/validateRequest';
import {
  createOfferedCourseValidation,
  updateOfferedCourseValidation,
} from './offeredCourse.validation';

// Route definitions for offered courses
const offeredCourseRouter = express.Router();

// Get a single offered course by ID
offeredCourseRouter.get('/:id', getSingleOfferedCourse);

// Get all offered courses
offeredCourseRouter.get('/', getAllOfferedCourses);

// Create a new offered course
offeredCourseRouter.post(
  '/create-offered-course',
  validateRequest(createOfferedCourseValidation),
  createOfferedCourse,
);

// Update an existing offered course by ID
offeredCourseRouter.patch(
  '/:id',
  validateRequest(updateOfferedCourseValidation),
  updateOfferedCourse,
);

// Delete an offered course by ID
offeredCourseRouter.delete('/:id', deleteOfferedCourse);

export default offeredCourseRouter;

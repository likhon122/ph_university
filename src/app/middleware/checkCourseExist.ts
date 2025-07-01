import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { Course } from '../modules/course/course.model';
import catchAsync from '../utils/catchAsync';

const checkCourseExist = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Title is required.');
  }

  const course = await Course.findOne({ title: title });

  if (course) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course already exist. Please try with different title.',
    );
  }

  next();
});

export default checkCourseExist;

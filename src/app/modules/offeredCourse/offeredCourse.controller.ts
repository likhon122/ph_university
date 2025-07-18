import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  createOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateSemesterRegistrationIntoDB,
} from './offeredCourse.service';

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration ID is required',
    );
  }

  const result = await getSingleOfferedCourseFromDB(id);

  return successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration retrieved successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await getAllOfferedCourseFromDB(req.query);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All offered courses retrieved successfully',
    data: result,
  });
});

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await createOfferedCourseIntoDB(req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await updateSemesterRegistrationIntoDB(id, req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  await deleteOfferedCourseFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course deleted successfully',
    data: {},
  });
});

export {
  getSingleOfferedCourse,
  getAllOfferedCourses,
  createOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};

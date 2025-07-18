import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  assignFacultiesWithCourseIntoDB,
  createCourseIntoDB,
  deleteCourseFromDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  removeFacultiesFromCourseIntoDB,
  updateCourseIntoDB,
} from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await getAllCoursesFromDB(req.query);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleCourseFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateCourseIntoDB(id, req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: { result },
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteCourseFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await assignFacultiesWithCourseIntoDB(courseId, faculties);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  successfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await removeFacultiesFromCourseIntoDB(courseId, faculties);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  successfully',
    data: result,
  });
});

export {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};

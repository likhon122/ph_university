import httpStatus from 'http-status';

import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentService,
} from './users.service';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const { newUser, newStudent } = await createStudentService(student, password);

  return successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Student created successfully.',
    data: {
      newUser,
      newStudent,
    },
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  const { newUser, newFaculty } = await createFacultyIntoDB(password, faculty);

  return successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created successfully',
    data: { newUser, newFaculty },
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const { newUser, newAdmin } = await createAdminIntoDB(password, adminData);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: { newUser, newAdmin },
  });
});

export { createStudent, createFaculty, createAdmin };

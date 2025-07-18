import httpStatus from 'http-status';

import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createStudentService,
  getMeFromDB,
  updateStatusIntoDB,
} from './users.service';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const { newUser, newStudent } = await createStudentService(
    student,
    password,
    req.file,
  );

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

const createFaculty = catchAsync(async (req, res,) => {
  const { password, faculty } = req.body;
  const { newUser, newFaculty } = await createFacultyIntoDB(
    password,
    faculty,
    req.file,
  );

  return successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Faculty is created successfully',
    data: { newUser, newFaculty },
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const { newUser, newAdmin } = await createAdminIntoDB(
    password,
    adminData,
    req.file,
  );

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: { newUser, newAdmin },
  });
});

const getMe = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await getMeFromDB(user);

  return successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await updateStatusIntoDB(id, req.body.status);
  return successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status is updated successfully',
    data: result,
  });
});

export { createStudent, createFaculty, createAdmin, getMe, updateStatus };

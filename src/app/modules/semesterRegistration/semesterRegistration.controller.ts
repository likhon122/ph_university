import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  createSemesterRegistrationIntoDB,
  deleteSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
} from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await createSemesterRegistrationIntoDB(req.body);

  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester registration created successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration ID is required',
    );
  }

  const result = await getSingleSemesterRegistrationFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration retrieved successfully',
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result = await getAllSemesterRegistrationsFromDB(req.query);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registrations retrieved successfully.',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester registration ID is required to update. Please provide id in params!',
    );
  }

  const result = await updateSemesterRegistrationIntoDB(id, req.body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration updated successfully',
    data: result,
  });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;

  await deleteSemesterRegistrationIntoDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      'Semester registration and associated offered course deleted successfully',
    data: {},
  });
});

export {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistrations,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};

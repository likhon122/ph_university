import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import httpStatus from 'http-status';
import {
  deleteFacultyFromDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
} from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleFacultyFromDB(id);
  return successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: { result },
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await getAllFacultiesFromDB(req.query);

  return successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await updateFacultyIntoDB(id, faculty);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: { result },
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteFacultyFromDB(id);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export { getAllFaculties, getSingleFaculty, deleteFaculty, updateFaculty };

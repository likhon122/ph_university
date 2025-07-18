import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
} from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFaculty = await createAcademicFacultyIntoDB(req.body);

  return successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Academic Faculty created successfully',
    data: { academicFaculty },
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const academicFaculties = await getAllAcademicFacultiesFromDB();

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculties fetched successfully',
    data: { academicFaculties },
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const academicFaculty = await getSingleAcademicFacultyFromDB(facultyId);

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty fetched successfully',
    data: { academicFaculty },
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const updatedAcademicFaculty = await updateAcademicFacultyFromDB(
    facultyId,
    req.body,
  );

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty updated successfully',
    data: { updatedAcademicFaculty },
  });
});

export {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};

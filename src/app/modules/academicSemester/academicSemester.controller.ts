import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
} from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = await createAcademicSemesterIntoDB(req.body);

  return successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Academic Semester created successfully',
    data: { academicSemester },
  });
});

const getAcademicSemesters = catchAsync(async (req, res) => {
  const academicSemesters = await getAcademicSemestersFromDB();

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semesters fetched successfully',
    data: { academicSemesters },
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const academicSemester = await getSingleAcademicSemesterFromDB(id);

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester fetched successfully',
    data: { academicSemester },
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedAcademicSemester = await updateAcademicSemesterFromDB(
    id,
    req.body,
  );

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Semester updated successfully',
    data: { updatedAcademicSemester },
  });
});

export {
  createAcademicSemester,
  getAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};

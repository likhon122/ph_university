import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
} from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const academicDepartment = await createAcademicDepartmentIntoDB(req.body);

  return successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Academic Department created successfully',
    data: { academicDepartment },
  });
});

const getAcademicDepartments = catchAsync(async (req, res) => {
  const academicSemesters = await getAllAcademicDepartmentsFromDB();

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Departments fetched successfully',
    data: { academicSemesters },
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const academicDepartment =
    await getSingleAcademicDepartmentFromDB(departmentId);

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Department fetched successfully',
    data: { academicDepartment },
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const updatedAcademicDepartment = await updateAcademicDepartmentFromDB(
    departmentId,
    req.body,
  );

  return successResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Department updated successfully',
    data: { updatedAcademicDepartment },
  });
});

export {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};

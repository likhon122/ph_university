import AppError from '../errors/AppError';
import AcademicDepartment from '../modules/academicDepartment/academicDepartment.model';
import AcademicFaculty from '../modules/academicFaculty/academicFaculty.model';
import catchAsync from '../utils/catchAsync';

const checkAcademicFacultyAndNameExist = catchAsync(async (req, res, next) => {
  const { academicFaculty, name } = req.body;

  const [academicFacultyExist, academicDepartment] = await Promise.all([
    AcademicFaculty.findById(academicFaculty),
    AcademicDepartment.findOne({ name }),
  ]);

  if (!academicFacultyExist?.name) {
    throw new AppError(
      404,
      'Academic Faculty not found. Please provide a valid academic faculty ID',
    );
  }
  if (academicDepartment?.name) {
    throw new AppError(
      400,
      'Academic Department already exists with this name. Please provide a different name',
    );
  }

  next();
});

export default checkAcademicFacultyAndNameExist;

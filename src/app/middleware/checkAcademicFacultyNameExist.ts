import AppError from '../errors/AppError';
import AcademicFaculty from '../modules/academicFaculty/academicFaculty.model';
import catchAsync from '../utils/catchAsync';

const checkAcademicFacultyNameExist = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const academicFaculty = await AcademicFaculty.findOne({ name });

  if (academicFaculty) {
    throw new AppError(400, 'Academic Faculty already exists');
  }

  next();
});

export default checkAcademicFacultyNameExist;

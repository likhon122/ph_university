import httpStatus from 'http-status';

import AppError from '../errors/AppError';
import Faculty from '../modules/faculty/faculty.model';
import catchAsync from '../utils/catchAsync';

const checkFacultyExist = catchAsync(async (req, res, next) => {
  const faculty = req.body.faculty;

  // Check if the faculty is already exist
  const facultyExist = await Faculty.findOne({
    $or: [{ email: faculty.email }, { contactNo: faculty.contactNo }],
  });
  if (facultyExist?.email === faculty.email) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty is already exist with this email address. Please try with another email address.',
    );
  } else if (facultyExist?.contactNo === faculty.contactNo) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty is already exist with this contact number. Please try with another contact number.',
    );
  } else if (facultyExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty is already exist with this email address and contact number. Please try with another email address and contact number.',
    );
  }
  next();
});

export default checkFacultyExist;

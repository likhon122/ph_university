import AppError from '../errors/AppError';
import Student from '../modules/student/student.model';
import catchAsync from '../utils/catchAsync';

const checkUserIsExit = catchAsync(async (req, res, next) => {
  const { student } = req.body;

  const studentIsExist = await Student.findOne({
    $or: [{ email: student.email }, { contactNo: student.contactNo }],
  }).select('email contactNo');

  if (studentIsExist?.email === student.email) {
    throw new AppError(
      400,
      'Student already exist. Please try with another email or login.',
      {},
    );
  } else if (studentIsExist?.contactNo) {
    throw new AppError(
      400,
      'Contact number already exist. Please try with another contact number or login.',
      {},
    );
  }
  next();
});

export default checkUserIsExit;

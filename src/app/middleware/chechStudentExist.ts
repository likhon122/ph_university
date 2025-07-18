import AppError from '../errors/AppError';
import Student from '../modules/student/student.model';
import catchAsync from '../utils/catchAsync';

const checkStudentExist = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    throw new AppError(400, 'Please provide studentId');
  }

  const student = await Student.findOne({ id: studentId });

  if (!student) {
    throw new AppError(
      404,
      'Student not found please provide correct studentId',
    );
  }

  if (student.isDeleted) {
    throw new AppError(
      401,
      'You are deleted your account. Please recover that! Or please contact us!',
    );
  }

  next();
});

export default checkStudentExist;
